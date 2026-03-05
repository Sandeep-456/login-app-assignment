const forge = require('node-forge');
const fs = require('fs');

const keys = forge.pki.rsa.generateKeyPair(2048);
const cert = forge.pki.createCertificate();
cert.publicKey = keys.publicKey;
cert.serialNumber = '01';
cert.validity.notBefore = new Date();
cert.validity.notAfter = new Date();
cert.validity.notAfter.setFullYear(cert.validity.notBefore.getFullYear() + 1);

const attrs = [
  { name: 'commonName', value: 'localhost' },
  { name: 'countryName', value: 'US' },
  { shortName: 'ST', value: 'Virginia' },
  { name: 'localityName', value: 'Blacksburg' },
  { name: 'organizationName', value: 'Test' },
  { shortName: 'OU', value: 'Test' }
];

cert.setSubject(attrs);
cert.setIssuer(attrs);

cert.setExtensions([{
  name: 'basicConstraints',
  cA: true
}, {
  name: 'keyUsage',
  keyCertSign: true,
  digitalSignature: true,
  nonRepudiation: true,
  keyEncipherment: true,
  dataEncipherment: true
}, {
  name: 'extKeyUsage',
  serverAuth: true,
  clientAuth: true,
  codeSigning: true,
  emailProtection: true,
  timeStamping: true
}, {
  name: 'nsCertType',
  client: true,
  server: true,
  email: true,
  objsign: true,
  sslCA: true,
  emailCA: true,
  objCA: true
}, {
  name: 'subjectAltName',
  altNames: [{
    type: 2, // DNS
    value: 'localhost'
  }, {
    type: 7, // IP
    ip: '127.0.0.1'
  }]
}]);

cert.sign(keys.privateKey, forge.md.sha256.create());

const pemCert = forge.pki.certificateToPem(cert);
const pemKey = forge.pki.privateKeyToPem(keys.privateKey);

fs.writeFileSync('cert.pem', pemCert);
fs.writeFileSync('key.pem', pemKey);
console.log('Certificates generated with node-forge!');
