const eGol = val => {
  return (
    val === undefined ||
    val === null ||
    (typeof val === "object" && Object.keys(val).length === 0) || //empty object
    (typeof val === "string" && val.trim().length === 0) //empty strng
  );
};

module.exports = eGol;
