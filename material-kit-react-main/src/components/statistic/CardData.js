import
{
  Card,
  CardContent,
  Grid,
  Typography,
} from '@material-ui/core';
import PropTypes from 'prop-types';

const CardData = ({ metric, metricValue, ...props }) => (
  <Card {...props}>
    <CardContent>
      <Grid container spacing={2} sx={{ justifyContent: 'space-between' }}>
        <Grid item>
          <Typography color="textSecondary" gutterBottom variant="subtitle2">
            {metric}
          </Typography>
          <Typography color="textPrimary" variant="h3">
            {metricValue}
          </Typography>
        </Grid>
      </Grid>
    </CardContent>
  </Card>
);

CardData.propTypes = {
  metric: PropTypes.string.isRequired,
  metricValue: PropTypes.string.isRequired
};

export default CardData;
