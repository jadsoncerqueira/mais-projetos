const validationEmail = (field) => {
  const usuario = field.substring(0, field.indexOf('@'));
  const dominio = field.substring(field.indexOf('@') + 1, field.length);
  const num = 3;
  const numq = -1;
  if ((usuario.length >= 1)
    && (dominio.length >= num)
    && (usuario.search('@') === numq)
    && (dominio.search('@') === numq)
    && (usuario.search(' ') === numq)
    && (dominio.search(' ') === numq)
    && (dominio.search('.') !== numq)
    && (dominio.indexOf('.') >= 1)
    && (dominio.lastIndexOf('.') < dominio.length - 1)) {
    return '';
  }
  return 'email inválido';
};

export default validationEmail;
