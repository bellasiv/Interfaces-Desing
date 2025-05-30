import express from "express";
import cors from "cors";
import {db} from "../src/firebase-config.js";
import {collection, addDoc, getDocs} from "firebase/firestore";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/usuarios", async (req, res) => {

  const { nombre, email, bio } = req.body;
  try {
    const docRef = await addDoc(collection(db, "usuarios"), { nombre, email, bio });
    res.status(201).send({ id: docRef.id });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.post("/api/posts", async (req, res) => {
  const { userId, texto, fecha } = req.body;
  try {
    const docRef = await addDoc(collection(db, "posts"), { userId, texto, fecha });
    res.status(201).send({ id: docRef.id });
  } catch (error) {
    res.status(500).send(error.message);
  }
});


app.get("/api/posts", async (req, res) => {
  try {
    const postsSnap = await getDocs(collection(db, "posts"));
    const posts = postsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.send(posts);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.listen(3000, () => console.log("Servidor corriendo en http://localhost:3000"));