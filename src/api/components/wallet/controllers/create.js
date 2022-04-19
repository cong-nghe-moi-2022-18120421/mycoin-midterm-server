import pkg from 'elliptic';
const { ec: EC } = pkg;
const ec = new EC('secp256k1');

const create = (req, res) => {
  const key = ec.genKeyPair();
  const publicKey = key.getPublic('hex');
  const privateKey = key.getPrivate('hex');

  res.status(400).send({
    key,
    publicKey,
    privateKey,
  });
};

export default create;
