import React from 'react';
import PropTypes from 'prop-types';

class Form extends React.Component {
  render() {
    const {
      cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
      cardRare,
      cardTrunfo,
      hasTrunfo,
      isSaveButtonDisabled,
      onInputChange,
      onSaveButtonClick,
    } = this.props;

    const comInput = (
      <input
        checked={ cardTrunfo }
        value={ cardTrunfo }
        onChange={ onInputChange }
        id="trunfoInput"
        data-testid="trunfo-input"
        type="checkbox"
      />);

    return (
      <form>
        <h2>Adicionar nova carta</h2>

        <label htmlFor="nameInput">
          Nome
          <br />
          <input
            value={ cardName }
            onChange={ onInputChange }
            id="nameInput"
            data-testid="name-input"
            name="cardName"
            type="text"
          />
        </label>

        <br />

        <label htmlFor="descricao">
          Descrição
          <br />
          <textarea
            value={ cardDescription }
            onChange={ onInputChange }
            id="descricao"
            name="cardDescription"
            data-testid="description-input"
          />
        </label>

        <br />

        <label htmlFor="at01">
          Attr01
          <input
            value={ cardAttr1 }
            onChange={ onInputChange }
            id="at01"
            name="cardAttr1"
            data-testid="attr1-input"
            type="number"
          />
        </label>

        <br />

        <label htmlFor="at02">
          Attr02
          <input
            value={ cardAttr2 }
            onChange={ onInputChange }
            id="at02"
            name="cardAttr2"
            data-testid="attr2-input"
            type="number"
          />
        </label>

        <br />

        <label htmlFor="at03">
          Attr03
          <input
            value={ cardAttr3 }
            onChange={ onInputChange }
            id="at03"
            name="cardAttr3"
            data-testid="attr3-input"
            type="number"
          />
        </label>

        <br />

        <label htmlFor="imageInput">
          Imagem
          <input
            value={ cardImage }
            onChange={ onInputChange }
            id="imageInput"
            name="cardImage"
            data-testid="image-input"
            type="text"
          />
        </label>

        <br />

        <select
          name="cardRare"
          value={ cardRare }
          onChange={ onInputChange }
          data-testid="rare-input"
        >
          <option value="normal">Normal</option>
          <option value="raro">Raro</option>
          <option value="muito raro">Muito Raro</option>
        </select>

        <br />

        <label htmlFor="trunfoInput">
          { hasTrunfo === true ? 'Você já tem um Super Trunfo em seu baralho' : comInput }

        </label>

        <br />

        <button
          disabled={ isSaveButtonDisabled }
          onClick={ onSaveButtonClick }
          data-testid="save-button"
          type="button"
        >
          Salvar
        </button>
      </form>
    );
  }
}

Form.propTypes = {
  cardName: PropTypes.string,
  cardDescription: PropTypes.string,
  cardAttr1: PropTypes.number,
  cardAttr2: PropTypes.number,
  cardAttr3: PropTypes.number,
  cardImage: PropTypes.string,
  cardRare: PropTypes.string,
  cardTrunfo: PropTypes.bool,
  hasTrunfo: PropTypes.bool,
  isSaveButtonDisabled: PropTypes.bool,
  onInputChange: () => {},
  onSaveButtonClick: () => {},
};

Form.defaultProps = {
  cardName: '',
  cardDescription: '',
  cardAttr1: 0,
  cardAttr2: 0,
  cardAttr3: 0,
  cardImage: '',
  cardRare: 'raro',
  cardTrunfo: false,
  hasTrunfo: false,
  isSaveButtonDisabled: true,
  onInputChange: () => {},
  onSaveButtonClick: () => {},
};
export default Form;
