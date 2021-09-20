const AWS = require('aws-sdk');
const crypto = require('crypto');
const moment = require("moment");
const NodeCache = require( "node-cache" );

const awsCredentials = {
    region: "us-east-2",
    endpoint: "https://dynamodb.us-east-2.amazonaws.com", // TODO endpoint
};

// need to create table first in the region, key -> email
const table = "table_user";

class DynamoDB {
    constructor() {
        AWS.config.update(awsCredentials);
        this.docClient = new AWS.DynamoDB.DocumentClient();
        this.myCache = new NodeCache();
    }

    getHashCode(password, factor) {
        return crypto.pbkdf2Sync(password, factor,
            1000, 8, `sha512`).toString(`hex`);
    }

    generateHashPwd(password) {
        const factor = crypto.randomBytes(16).toString('hex');
        const hashPwd = this.getHashCode(password, factor);
        return [hashPwd, factor];
    }

    validatePassword(hashPassword, newPassword, factor) {
        const hashPwd = this.getHashCode(newPassword, factor);
        return hashPassword === hashPwd;
    }

    async queryByEmail(email, callback = null) {
        try {
            if (this.myCache.has(email)) {
                console.log(`query cache: JSON:`);
                callback(null, this.myCache.get(email));
                return [null, this.myCache.get(email)];
            }
            if (email === null || email === undefined) {
                if (callback != null)
                    callback('email must be provided', null);
                return ['email must be provided', null];
            }
            var params = {
                TableName: table,
                KeyConditionExpression: "#email = :email",
                ExpressionAttributeNames: {
                    "#email": "email"
                },
                ExpressionAttributeValues: {
                    ":email": email
                }
            };
            const result = await this.docClient.query(params).promise();
            if (result.Items == undefined) {
                if (callback != null)
                    callback('error', null);
                return ['error', null];
            }
            if (callback != null)
                callback(null, result);
            if (!this.myCache.has(email)) {
                this.myCache.set(email, result);
            }
            return [null, result];
        } catch (error) {
            console.log(error);
            if (callback != null)
                callback(error, null);
            return [error, null];
        }
    }


    async signInWithEmailAndPassword(email, paraPassword, callback) {
        try {
            if (email === null || email === undefined) {
                return callback('email must be provided', null);
            }
            if (paraPassword === null || paraPassword === undefined) {
                return callback('password must be provided', null);
            }
            const resultArray = await this.queryByEmail(email);
            const err = resultArray[0];
            const result = resultArray[1];
            if (err != null) {
                return callback(err, null);
            } else {
                let hashPassword = '';
                let factor = '';
                result.Items.forEach(function (item) {
                    hashPassword = item.password;
                    factor = item.factor;
                });
                const varResult = this.validatePassword(hashPassword, paraPassword, factor);
                console.log(`varResult: ${varResult}`);
                if (!varResult) {
                    return callback('Either email or password is incorrect', null);
                } else {
                    const {password,factor, ...userInfo} = result.Items[0]
                    return callback(null, userInfo);
                }
            }
        } catch (error) {
            console.log(error);
            callback(error, null);
        }
    }

    async signUp(account, callback) {
        try {
            if (account === null || account === undefined) {
                return callback('account must be provided', null);
            }
            console.log(`signUp:${JSON.stringify(account)}`)
            const docClient = this.docClient;
            const array = this.generateHashPwd(account.password);
            const resultArray = await this.queryByEmail(account.email);
            const result = resultArray[1];
            if (result.Items.length > 0) {
                return callback('Email account has existed', null);
            }
            const reg_time = moment().format("MM/DD/YYYY HH:mm:ss");
            const hashPassword = array[0];
            const factor = array[1];

            const params = {
                TableName: table,
                Item: {
                    "reg_time": reg_time,
                    "password": hashPassword,
                    "email": account.email,
                    "factor": factor,
                    'first_name': account.firstName,
                    'last_name': account.lastName,
                }
            };
            const cache = this.myCache;
            docClient.put(params, function (err, data) {
                if (err) {
                    console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
                } else {
                    console.log("Added item:", JSON.stringify(data, null, 2));
                }
                callback(err, data);
                if (cache.has(account.email)) {
                    cache.del(account.email);
                    console.log('signup:delete the cache')
                }
            });
        } catch (error) {
            console.log(error);
            callback(error, null);
        }
    }

    async saveAccount(account, callback) {
        try {
            if (account === null || account === undefined) {
                return callback('account must be provided', null);
            }
            console.log(`account: ${JSON.stringify(account.first_name)}, ${JSON.stringify(account.last_name)}`);
            var params = {
                TableName: table,
                Key: {
                    "email": account.email,
                },
                UpdateExpression: `set first_name=:first_name, last_name=:last_name,
                                   country=:country`,
                ExpressionAttributeValues: {
                    ":first_name": account.first_name,
                    ":last_name": account.last_name,
                    ":country": account.country,
                },
                ReturnValues: "UPDATED_NEW"
            };
            const cache = this.myCache;
            this.docClient.update(params, function (err, data) {
                if (err) {
                    console.error("Unable to update item. Error JSON:", JSON.stringify(err));
                } else {
                    console.log("UpdateItem succeeded:", JSON.stringify(data));
                }
                callback(err, data);
                if (cache.has(account.email)) {
                    cache.del(account.email);
                    console.log('delete the cache')
                }
            });
        } catch (error) {
            console.log(error);
            callback(error, null);
        }
    }

    async updatePassword(email, paraPassword, callback) {
        try {
            if (email === null || email === undefined) {
                return callback('email must be provided', null);
            }
            if (paraPassword === null || paraPassword === undefined) {
                return callback('new password must be provided', null);
            }
            const array = this.generateHashPwd(paraPassword);
            const hashPassword = array[0];
            const factor = array[1];
            var params = {
                TableName: table,
                Key: {
                    "email": email,
                },
                UpdateExpression: "set password = :password, factor = :factor",
                ExpressionAttributeValues: {
                    ":password": hashPassword,
                    ":factor": factor
                },
                ReturnValues: "UPDATED_NEW"
            };
            const cache = this.myCache;
            this.docClient.update(params, function (err, data) {
                if (err) {
                    console.error("Unable to update item. Error JSON:", JSON.stringify(err));
                } else {
                    console.log("UpdateItem succeeded:", JSON.stringify(data));
                }
                callback(err, data);
                if (cache.has(email)) {
                    cache.del(email);
                }
            });
        } catch (error) {
            console.log(error);
            callback(error, null);
        }
    }

}

const DynamoDBInstance = new DynamoDB();

module.exports = DynamoDBInstance;
