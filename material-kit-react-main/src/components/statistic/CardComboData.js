import
{
  Card,
  CardContent,
  Grid,
  Typography,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import Country from 'src/components/statistic/Country';

const CardComboData = ({
  metric, metricValue, valueChanged, ...props
}) => (
  <Card {...props}>
    <CardContent>
      <Grid container spacing={1} sx={{ justifyContent: 'space-between' }}>
        <Grid item>
          <Typography color="textPrimary" variant="h3">
            {metric}
          </Typography>
        </Grid>
        <Grid item>
          <Country metricValue={metricValue} valueChanged={valueChanged} />
        </Grid>
      </Grid>
    </CardContent>
  </Card>
);

CardComboData.propTypes = {
  metric: PropTypes.string.isRequired,
  metricValue: PropTypes.string.isRequired,
  valueChanged: PropTypes.func.isRequired,
};

export default CardComboData;
