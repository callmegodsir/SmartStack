import { MongoClient } from "mongodb";
// This lib is use just to connect to the database in next-auth. We don't use it anywhere else in the API routes. See [...nextauth].js file.

declare global {
  // eslint-disable-next-line no-unused-vars
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

if (!process.env.MONGODB_URI) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
}

const uri = process.env.MONGODB_URI;
let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === "development") {
  // En développement, utilisez une variable globale pour préserver la valeur
  // entre les rechargements à chaud (hot module replacement).
  let globalWithMongo = global as typeof globalThis & {
    _mongoClientPromise?: Promise<MongoClient>;
  };

  if (!globalWithMongo._mongoClientPromise) {
    client = new MongoClient(uri);
    globalWithMongo._mongoClientPromise = client.connect();
  }
  clientPromise = globalWithMongo._mongoClientPromise;
} else {
  // En production, il est préférable de ne pas utiliser de variable globale.
  client = new MongoClient(uri);
  clientPromise = client.connect();
}

// Exportez une promesse de MongoClient. Ceci sera utilisé par l'adaptateur.
export default clientPromise; // <= C'est ce que MongoDBAdapter attend

// Optionnel: une fonction helper pour obtenir la DB si besoin ailleurs
// export async function getDb() {
//    const client = await clientPromise;
//    return client.db(); // Ajoutez le nom de votre DB si nécessaire
// }
