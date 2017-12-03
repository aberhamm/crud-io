import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Form from '../components/Form';
import { createDonation, clearForm } from '../actions';

class DonationForm extends PureComponent {
  static propTypes = {
    success: PropTypes.bool,
    message: PropTypes.string,
    errors: PropTypes.object
  }

  state = {
    amount: '',
    organization: ''
  }

  componentWillReceiveProps = (nextProps) => {
    if (!this.props.success && nextProps.success) {
      this.setState({
        amount: '',
        organization: ''
      });
    }
  }

  componentWillUnmount() {
    this.props.clearForm('donate');
  }

  handleChange = prop => event => {
    // Reset form
    if (this.props.success) this.props.clearForm('donate');

    this.setState({
      [prop]: event.target.value
    });
  }

  processForm = () => {
    this.props.createDonation(this.state);
  }

  render() {
    const { errors, message, success } = this.props;

    return (
      <Form
        title="Donate to Organization"
        buttonText="Donate"
        handleSubmit={this.processForm}
        handleChange={this.handleChange}
        message={message}
        success={success}
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
  return state.form.donate;
};

const mapDispatchToProps = (dispatch) => {
  return {
    createDonation: data => dispatch(createDonation(data)),
    clearForm: formName => dispatch(clearForm(formName))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DonationForm);
