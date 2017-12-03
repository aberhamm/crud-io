import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import {
  Grid,
  FormControl,
  InputLabel,
  Input,
  FormHelperText,
  Button,
  Typography
} from 'material-ui';

const styles = theme => ({
  Root: {
    display: 'flex',
    flexGrow: 1
  },
  Form__message_success: {
    color: theme.palette.common.green
  },
  Form__message_error: {
    color: theme.palette.common.red
  },
  FormField__container: {
    marginTop: theme.spacing.unit
  },
  Button__submit: {
    width: '100%',
    marginTop: theme.spacing.unit * 4,
  }
});

class Form extends Component {
  static propTypes = {
    buttonText: PropTypes.string.isRequired,
    classes: PropTypes.object.isRequired,
    errors: PropTypes.object,
    fields: PropTypes.array.isRequired,
    handleChange: PropTypes.func.isRequired,
    message: PropTypes.string,
    success: PropTypes.bool,
    title: PropTypes.string.isRequired
  }

  static defaultProps = {
    errors: {},
    fields: []
  }

  processForm = event => {
    event.preventDefault();
    this.props.handleSubmit();
  }

  render() {
    const {
      buttonText,
      classes,
      errors,
      fields,
      handleChange,
      message,
      success,
      title
    } = this.props;

    return (
      <div className={classes.Root}>
        <Grid container spacing={24}>
          <Grid item xs={12}>
            <form action="/" onSubmit={this.processForm}>
              <Typography gutterBottom type="display1" color="primary">
                { title }
              </Typography>

              {
                message &&
                <Typography
                  gutterBottom
                  className={success ? classes.Form__message_success : classes.Form__message_error}>
                  {message}
                </Typography>
              }

              { fields.map((field, i) => (
                <FormControl fullWidth key={field + i} className={classes.FormField__container} error={!!errors[field.key]}>
                  <InputLabel htmlFor={field.key}>{field.title}</InputLabel>
                  <Input
                    id={field.key}
                    type={field.type}
                    value={field.value || ''}
                    onChange={handleChange(field.key)}
                  />
                  { errors[field.key] && <FormHelperText>{errors[field.key]}</FormHelperText> }
                </FormControl>
              ))}

              <Button raised type="submit" color="primary" className={classes.Button__submit}>
                { buttonText }
              </Button>
            </form>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(Form);
