import React, { Component } from 'react';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';

import Form from '../components/Form';
import { createDonation } from '../actions';

class EditUserForm extends Component {
  state = {
    amount: this.props.user.amount,
    organization: this.props.user.organization
  };

  handleChange = prop => event => {
    this.setState({
      [prop]: event.target.value
    });
  };

  processForm = () => {
    this.props.createDonation(this.state);
  };

  render() {
    const { errors, message } = this.props;

    return (
      <Form
        title="Donate to Organization"
        buttonText="Donate"
        handleSubmit={this.processForm}
        handleChange={this.handleChange}
        message={message}
        errors={errors}
        fields={[{
          key: 'organization',
          value: this.state.organization,
          title: 'Organization Name'
        }, {
          key: 'amount',
          value: this.state.amount,
          type: 'number',
          title: 'Amount'
        }]}
      />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    message: state.form.donate.message,
    errors: state.form.donate.errors || {}
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createDonation: data => dispatch(createDonation(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditUserForm);
