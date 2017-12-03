import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Form from '../components/Form';
import { updateCurrentUser } from '../actions';

class EditUserForm extends PureComponent {
  static propTypes = {
    errors: PropTypes.object,
    message: PropTypes.string,
    success: PropTypes.bool,
    user: PropTypes.object.isRequired
  }

  state = {
    email: this.props.user.email,
    name: this.props.user.name
  }

  handleChange = prop => event => {
    this.setState({
      [prop]: event.target.value
    });
  }

  processForm = () => {
    this.props.updateCurrentUser({ ...this.props.user, ...this.state });
  }

  render() {
    const { errors, message, success } = this.props;
    return (
      <Form
        title="Edit Profile"
        buttonText="Save"
        handleSubmit={this.processForm}
        handleChange={this.handleChange}
        success={success}
        message={message}
        errors={errors}
        fields={[{
          key: 'email',
          value: this.state.email,
          title: 'Email'
        }, {
          key: 'name',
          value: this.state.name,
          title: 'Name'
        }]}
      />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    errors: state.form.updateUser.errors,
    message: state.form.updateUser.message,
    success: state.form.updateUser.success
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateCurrentUser: data => dispatch(updateCurrentUser(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditUserForm);
