import React, { useState, useEffect } from "react";
import "./App.css";
import "@aws-amplify/ui-react/styles.css";
import { API, Storage } from "aws-amplify";
import {
  Button,
  Flex,
  Heading,
  Text,
  TextField,
  View,
  withAuthenticator,
  Image
} from "@aws-amplify/ui-react";
import { listNotes } from "./graphql/queries";
import {
  createNote as createNoteMutation,
  deleteNote as deleteNoteMutation
} from "./graphql/mutations";

const App = ({ signOut }) => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    fetchNotes();
  }, []);

  async function fetchNotes() {
    const apiData = await API.graphql({ query: listNotes });
    const notesFromAPI = apiData.data.listNotes.items;
    await Promise.all(
      notesFromAPI.map(async (note) => {
        if (note.image) {
          const url = await Storage.get(note.image);
          note.image = url;
        }
        return note;
      })
    );
    setNotes(notesFromAPI);
  }

  async function createNote(event) {
    event.preventDefault();
    const form = new FormData(event.target);
    const image = form.get("image");
    const data = {
      name: form.get("name"),
      description: form.get("description"),
      image: image ? image.name : null
    };
    if (data.image)
      await Storage.put(data.image, image, { contentType: "image/*" });
    await API.graphql({
      query: createNoteMutation,
      variables: { input: data }
    });
    fetchNotes();
    event.target.reset();
  }

  async function deleteNote({ id, name }) {
    const newNotes = notes.filter((note) => note.id !== id);
    setNotes(newNotes);
    await Storage.remove(name);
    await API.graphql({
      query: deleteNoteMutation,
      variables: { input: { id } }
    });
  }

  return (
    <View className="App">
      <Heading level={1}>My Notes App</Heading>
      <View as="form" margin="3rem 0" onSubmit={createNote}>
        <Flex direction="row" justifyContent="center">
          <TextField
            name="name"
            placeholder="Note Name"
            label="Note Name"
            labelHidden
            variation="quiet"
            required
          />
          <TextField
            name="description"
            placeholder="Note Description"
            label="Note Description"
            labelHidden
            variation="quiet"
            required
          />
          <View style={{ position: "relative" }}>
            {/* Add positioning */}
            <Image
              id="image"
              src={null}
              style={{
                width: 0,
                height: 0,
                position: "absolute",
                top: 0,
                left: 0,
                opacity: 0,
                pointerEvents: "none", // prevent click events from triggering
                display: "none" // hide the file input from view
              }}
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];
                document.getElementById("image").src =
                  URL.createObjectURL(file);
              }}
            />
            <label htmlFor="image">
              <Button as="span" variation="primary">
                Add Image
              </Button>
            </label>
          </View>
          <Button type="submit" variation="primary">
            Create Note
          </Button>
        </Flex>
        {/* Move input out of previous Flex */}
        <input
          name="image"
          type="file"
          style={{ display: "none" }}
          accept="image/*"
        />
      </View>
      <Heading level={2}>Current Notes</Heading>
      <View margin="3rem 0">
        <View
          name="image"
          as="input"
          type="file"
          style={{ alignSelf: "end" }}
        />
        {notes.map((note) => (
          <Flex
            key={note.id || note.name}
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            <Text as="strong" fontWeight={700}>
              {note.name}
            </Text>
            <Text as="span">{note.description}</Text>
            {note.image && (
              <Image
                src={note.image}
                alt={`visual aid for ${notes.name}`}
                style={{ width: 400 }}
              />
            )}
            <Button variation="link" onClick={() => deleteNote(note)}>
              Delete note
            </Button>
          </Flex>
        ))}
      </View>
      <Button onClick={signOut}>Sign Out</Button>
    </View>
  );
};

export default withAuthenticator(App);
