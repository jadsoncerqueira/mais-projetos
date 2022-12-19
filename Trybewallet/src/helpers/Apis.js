export const fetchAllCoin = async () => {
  const retorno = await fetch('https://economia.awesomeapi.com.br/json/all');
  return retorno.json();
};

export const deleteTask = (listTask, id) => listTask.filter((task) => task.id !== id);

export const countTotal = (arr) => {
  const resultado = arr.reduce((el, atu) => el + (Number(atu.value)
  * Number(atu.exchangeRates[atu.currency].ask)), 0);
  return resultado;
};

// const lis = [{ id: 12 }, { id: 6 }, { id: 7 }];
// console.log(deleteTask(lis, 12));
