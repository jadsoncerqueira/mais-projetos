import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import validationEmail from '../helpers/validationEmail';
import validationButton from '../helpers/validationButton';
import './Login.css';
import { salvarEmail } from '../redux/actions';
// import { fetchAllCoin } from '../helpers/Apis';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      valuePassword: '',
      erroPassword: '',
      butonDis: true,
      validEmail: '',
      rediction: false,
    };
  }

  // async componentDidMount() {
  //   const resultado = await fetchAllCoin();
  //   const valuesList = Object.keys(resultado);
  //   const aux = valuesList.filter((elem) => elem !== 'USDT');

  //   this.setState({
  //     resultadoMoedas: aux,
  //   });
  // }

  rediction = (salvarEmail2) => {
    const { email } = this.state;
    salvarEmail2(email);
    this.setState({
      rediction: true,
    });
  }

  validationPassword = (event) => {
    const {
      erroPassword,
      butonDis,
      valuePassword,
      email,
      validEmail,
    } = this.state;

    let passwordErro = erroPassword;
    const element = event.target;
    const quantMin = 6;

    if (element.value.length < quantMin && element.name === 'valuePassword') {
      passwordErro = 'A senha não pode ter menos que 6 caracteres';
    } else {
      passwordErro = '';
    }
    this.setState({
      [element.name]: element.value,
      erroPassword: passwordErro,
    }, () => {
      this.setState({
        butonDis: validationButton(email, valuePassword, butonDis, validEmail),
      });
      if (element.name === 'email') {
        this.setState({
          validEmail: validationEmail(email),
        });
      }
    });
  }

  render() {
    const { salvarEmail1 } = this.props;
    const {
      valuePassword,
      erroPassword,
      butonDis,
      email,
      validEmail,
      rediction,
      // resultadoMoedas,
    } = this.state;
    // if (resultadoMoedas.length > 0) {
    //   setStateGlobal(resultadoMoedas);
    // }
    return (
      <form className="formulario">
        <fieldset className="field">
          <legend className="legenda">LOGIN</legend>
          <input
            className="inputs"
            data-testid="email-input"
            name="email"
            value={ email }
            onChange={ this.validationPassword }
            type="email"
            placeholder="Email"
          />
          <input
            className="inputs"
            data-testid="password-input"
            type="password"
            name="valuePassword"
            value={ valuePassword }
            onChange={ this.validationPassword }
            placeholder="Senha"
          />
          <button
            className="botao"
            onClick={ (event) => {
              event.preventDefault();
              this.rediction(salvarEmail1);
            } }
            disabled={ butonDis }
            type="submit"
          >
            Entrar
          </button>
          <p className="erros">{ erroPassword }</p>
          <p className="erros">{ validEmail }</p>
        </fieldset>
        { rediction && <Redirect to="/carteira" /> }
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  salvarEmail1: (email) => dispatch(salvarEmail(email)),
  // setStateGlobal: (moedas) => dispatch(salvarMoedas(moedas)),
});

Login.propTypes = {
  salvarEmail1: PropTypes.func.isRequired,
  // setStateGlobal: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
