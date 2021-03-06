import Component from 'react-pure-render/component';
import React, { PropTypes } from 'react';
import newTodoMessages from '../../common/todos/newTodoMessages';
import { FormattedMessage } from 'react-intl';
import { StyleSheet, TextInput, View } from 'react-native';
import { addTodo } from '../../common/todos/actions';
import { connect } from 'react-redux';
import { fields } from '../../common/lib/redux-fields';
import { theme } from '../app/styles';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.brandPrimary,
    borderTopColor: '#73CEE7',
    borderTopWidth: 1,
    height: 62
  },
  input: {
    color: '#fff',
    flex: 1,
    fontFamily: 'Helvetica Neue',
    fontSize: 16,
    paddingLeft: 10,
    paddingRight: 10
  }
});

class NewTodo extends Component {

  static propTypes = {
    addTodo: PropTypes.func.isRequired,
    fields: PropTypes.object.isRequired
  };

  constructor() {
    super();
    this.onTextInputEndEditing = this.onTextInputEndEditing.bind(this);
    this.onSubmitEditing = this.onSubmitEditing.bind(this);
  }

  onTextInputEndEditing() {
    const { addTodo, fields } = this.props;
    if (!fields.title.value.trim()) return;
    addTodo(fields.title.value);
    fields.$reset();
  }

  onSubmitEditing() {
    this.onTextInputEndEditing();
  }

  render() {
    const { fields } = this.props;

    return (
      <View style={styles.container}>
        <FormattedMessage {...newTodoMessages.placeholder}>
          {message => <TextInput
            {...fields.title}
            maxLength={100} // React Native needs explicit maxLength.
            onEndEditing={this.onTextInputEndEditing}
            onSubmitEditing={this.onSubmitEditing}
            placeholder={message}
            placeholderTextColor={'#cce9f2'}
            style={styles.input}
          />}
        </FormattedMessage>
      </View>
    );
  }

}

NewTodo = fields(NewTodo, {
  path: 'newTodo',
  fields: ['title']
});

export default connect(null, { addTodo })(NewTodo);
