
module.exports =
  (schema, source = "body") =>
  (req, res, next) => {
    const errors = validate(req[source] || {}, schema);

    if (errors && errors.length > 0) {
      return res.status(400).send({message:errors[0]});
    }

    next();
  };

function validate(data, schema) {
  const { error } = schema.validate(data);

  if (!error) return;
  return error.details.map((error) => error.message);
}
