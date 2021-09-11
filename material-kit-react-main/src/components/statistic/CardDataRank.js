import
{
  Card,
  CardContent,
  Grid,
  List,
  ListItem,
  ListItemText,
  Typography,
} from '@material-ui/core';
import PropTypes from 'prop-types';

const CardDataRank = ({ title, datas, ...props }) => {
  const sortedByCases = datas
    .slice(0, 5)
    .sort((a, b) => b.cases - a.cases);

  const sortedByDeath = datas
    .slice(0, 5)
    .sort((a, b) => b.death - a.death);

  return (
    <Card {...props}>
      <CardContent>
        <Grid container spacing={2} sx={{ justifyContent: 'space-between' }}>
          <Grid item>
            <Typography color="textPrimary" variant="h3">
              {title}
            </Typography>
            <Typography color="textSecondary" gutterBottom variant="subtitle2">
              <List>
                {
                  title.includes('Cases')
                    ? (sortedByCases.map((i) => (
                      <ListItem key={i.name}>
                        <ListItemText>
                          {i.name}
                          {' '}
                          { i.cases}
                        </ListItemText>
                      </ListItem>
                    )))
                    : (sortedByDeath.map((i) => (
                      <ListItem key={i.name}>
                        <ListItemText>
                          {i.name}
                          {' '}
                          { i.death}
                        </ListItemText>
                      </ListItem>
                    )))

                }

              </List>
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

CardDataRank.propTypes = {
  title: PropTypes.string.isRequired,
  datas: PropTypes.array.isRequired
};

export default CardDataRank;
