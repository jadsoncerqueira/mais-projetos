const fs = require('fs').promises;
const path = require('path');

const caminho = '../src/talker.json';

const getData = async () => {
  try {
     return JSON.parse(await fs.readFile(path.resolve(__dirname, caminho)));
  } catch (error) {
    return [];   
  }
};

const setData = async (newPerson) => {
  const data = await getData();
  const up = JSON.stringify([...data, newPerson]);
  try {
    await fs.writeFile(path.resolve(__dirname, caminho), up);
  } catch (error) {
    return [];   
  }
};

module.exports = {
  getData,
  setData,
};