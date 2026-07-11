const direBonjour = (req, res) => {
  res.send({ message: "Bonjour depuis le contrôleur !" });
};

export default { direBonjour };
export { direBonjour };
