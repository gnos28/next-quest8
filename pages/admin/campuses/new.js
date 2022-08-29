import React from "react";
import { useState } from "react";
import axios from "axios";
import Layout from "/components/Layout";

export default function newCampus() {
  const [campusName, setCampusName] = useState("");

  const createNewCampus = async (e) => {
    e.preventDefault();
    try {
      const axiosNew = await axios.post(`http://localhost:3000/api/campuses`, {
        name: campusName,
      });
      window.alert(
        `new campus ${axiosNew.data.name} ${axiosNew.data.id} created`
      );
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Layout pageTitle="new campus">
      <form onSubmit={createNewCampus}>
        <label htmlFor="inputText">nom du nouveau campus : </label>
        <input
          id="inputText"
          type="text"
          value={campusName}
          onChange={(e) => setCampusName(e.target.value)}
        ></input>
        <button type="submit">Créer</button>
      </form>
    </Layout>
  );
}
