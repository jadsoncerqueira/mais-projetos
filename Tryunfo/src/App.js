import React, { Component } from 'react';
import Form from './components/Form';
import Card from './components/Card';

class App extends Component {
  constructor() {
    super();
    this.state = {
      cardName: '',
      cardDescription: '',
      cardImage: '',
      cardAttr1: 0,
      cardAttr2: 0,
      cardAttr3: 0,
      cardRare: 'normal',
      cardTrunfo: false,
      isSaveButtonDisabled: true,
      hasTrunfo: false,
      cardsList: [],
    };
  }

  verificaNom = (soma) => {
    const somaAtr = 210;
    const { cardName, cardDescription, cardImage, cardRare } = this.state;
    if (
      soma > 0 && soma <= somaAtr
      && cardName.length > 0
      && cardDescription.length > 0
      && cardImage.length > 0
      && cardRare.length > 0
    ) {
      return false;
    } if (soma > somaAtr) { return true; }
  }

  verificaAtributo = (vari, value) => {
    switch (vari) {
    case 'cardAttr1':
      localStorage.setItem('cad1', value);
      break;
    case 'cardAttr2':
      localStorage.setItem('cad2', value);
      break;
    case 'cardAttr3':
      localStorage.setItem('cad3', value);
      break;
    default:
    }
  }

  onSaveButtonClick = () => {
    const {
      cardName, cardDescription, cardAttr1, cardAttr2,
      cardAttr3, cardImage, cardRare, cardTrunfo,
    } = this.state;

    const cardInfo = {
      cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
      cardRare,
      cardTrunfo,
    };
    console.log(cardInfo);

    this.setState((prev) => ({
      cardsList: [...prev.cardsList, cardInfo],
    }));

    const itens = JSON.parse(localStorage.getItem('cardList')) || [];
    localStorage.setItem('cardList', JSON.stringify([...itens, cardInfo]));

    this.setState((anterior) => ({
      cardName: '',
      cardDescription: '',
      cardImage: '',
      cardRare: 'normal',
      cardAttr1: 0,
      cardAttr2: 0,
      cardAttr3: 0,
      hasTrunfo:
        anterior.hasTrunfo === false
        && cardTrunfo === true,
    }));
  }

  onInputChange = (event) => {
    const { name, value, checked } = event.target;
    this.verificaAtributo(name, value);
    const cad1 = parseInt(localStorage.getItem('cad1'), 10) || 0;
    const cad2 = parseInt(localStorage.getItem('cad2'), 10) || 0;
    const cad3 = parseInt(localStorage.getItem('cad3'), 10) || 0;

    const soma = cad1 + cad2 + cad3;
    const maxAtribute = 90;

    this.setState((anterior) => (
      {
        [name]: typeof anterior[name] === 'number'
          ? parseInt(value, 10) : value,

        cardTrunfo: checked,

        isSaveButtonDisabled:
          !value
          || value > maxAtribute
          || cad1 < 0 || cad2 < 0
          || cad3 < 0 ? true : this.verificaNom(soma),
      }));
  }

  render() {
    const cartas = JSON.parse(localStorage.getItem('cardList')) || [];
    const {
      cardName,
      cardDescription,
      cardImage,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardRare,
      cardTrunfo,
      isSaveButtonDisabled,
      hasTrunfo,
    } = this.state;
    return (
      <div>
        <Form
          isSaveButtonDisabled={ isSaveButtonDisabled }
          onSaveButtonClick={ this.onSaveButtonClick }
          onInputChange={ this.onInputChange }
          cardName={ cardName }
          cardDescription={ cardDescription }
          cardImage={ cardImage }
          cardAttr1={ cardAttr1 }
          cardAttr2={ cardAttr2 }
          cardAttr3={ cardAttr3 }
          cardRare={ cardRare }
          cardTrunfo={ cardTrunfo }
          hasTrunfo={ hasTrunfo }
        />
        <Card
          cardName={ cardName }
          cardDescription={ cardDescription }
          cardImage={ cardImage }
          cardAttr1={ cardAttr1 }
          cardAttr2={ cardAttr2 }
          cardAttr3={ cardAttr3 }
          cardRare={ cardRare }
          cardTrunfo={ cardTrunfo }
        />
        <ul>
          {cartas.map((elem) => (
            <li key={ elem.cardName }>
              <Card
                cardName={ elem.cardName }
                cardDescription={ elem.cardDescription }
                cardImage={ elem.cardImage }
                cardAttr1={ elem.cardAttr1 }
                cardAttr2={ elem.cardAttr2 }
                cardAttr3={ elem.cardAttr3 }
                cardRare={ elem.cardRare }
                cardTrunfo={ elem.cardTrunfo }
              />
            </li>)) }
        </ul>
      </div>
    );
  }
}

export default App;
