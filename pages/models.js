import { useState, useContext, useRef, useEffect } from "react";
import Head from "next/head";
import { engines } from "../model/model.js";
import ChatContext from "../context/ChatContext.js";
import AIContext from "../context/AIContext.js";
import Sidebar from "../components/Sidebar/Sidebar.js";
import ChatSettingsControl from "../components/AIManipulatingComponents/AISettingsControl.js";
import Header from "../components/Header/Header.js";
import UIContext from "../context/UIContext.js";
import { v4 as uuidv4 } from "uuid";
import ColorfulButtonSet from "../components/Buttons/ColorfulButtons.js";
import GroupRadioButtons from "../components/Inputs/GroupRadio/GroupRadioButtons.js";
//import EngineSelector from "../components/AIManipulatingComponents/EngineSelector.js";
// import RangeField from "../components/controls/RangeField.js";
import { Box } from "../components/Atoms/Box.js";
import OrdinaryButton from "../components/Buttons/OrdinaryButton.js";
import ResponsiveTable from "../components/Lists/ResponsiveTable.js";
export default function MyPage() {
  const { asideExpanded, setAsideExpand } = useContext(UIContext);

  const { chatHistory, addToHistory, isLoading, setIsLoading } =
    useContext(ChatContext);

  const { AIstate, setAIState } = useContext(AIContext);

  const [activeEngine, setActiveEngine] = useState(engines[0]);
  const [models, setModels] = useState([]);

  // function hierarchyStructure(data) {
  //   // Create a dictionary with owned_by as keys and an empty children array as values
  //   const hierarchy = {};
  //   for (let model of data) {
  //     const parentId = model.owned_by || null;
  //     hierarchy[parentId] = hierarchy[parentId] || { children: [] };
  //   }

  //   // Add each model to its parent's children array
  //   for (let model of data) {
  //     const parentId = model.owned_by || null;
  //     const parent = hierarchy[parentId];
  //     const child = {
  //       created: model.created,
  //       id: model.id,
  //       object: model.object,
  //       children: [],
  //     };
  //     // Sort children based on created field
  //     const children = parent.children;
  //     const index = children.findIndex((c) => c.created < child.created);
  //     if (index === -1) {
  //       children.push(child);
  //     } else {
  //       children.splice(index, 0, child);
  //     }
  //   }

  //   // Remove permission property from the result
  //   const cleanHierarchy = (node) => {
  //     delete node.permission;
  //     for (let child of node.children) {
  //       cleanHierarchy(child);
  //     }
  //   };
  //   for (let parent of Object.values(hierarchy)) {
  //     cleanHierarchy(parent);
  //   }

  //   return hierarchy[null].children; // Return the root nodes (models without parent)
  // }

  function hierarchyStructure(data) {
    // Create a dictionary with owned_by as keys and an empty children array as values
    const hierarchy = {};
    for (let model of data) {
      const parentId = model.owned_by || null;
      hierarchy[parentId] = hierarchy[parentId] || { children: [] };
    }

    // Add each model to its parent's children array
    for (let model of data) {
      const parentId = model.owned_by || null;
      const parent = hierarchy[parentId];
      const child = {
        created: model.created,
        id: model.id,
        object: model.object,
        children: [],
      };
      // Sort children based on created field
      const children = parent.children;
      const index = children.findIndex((c) => c.created < child.created);
      if (index === -1) {
        children.push(child);
      } else {
        children.splice(index, 0, child);
      }
    }

    // Remove permission property from the result
    const cleanHierarchy = (node) => {
      delete node.permission;
      for (let child of node.children) {
        cleanHierarchy(child);
      }
    };
    for (let parent of Object.values(hierarchy)) {
      cleanHierarchy(parent);
    }

    // Find the root nodes (models without parent) based on parents that don't exist in hierarchy
    const rootNodes = [];
    for (let model of data) {
      if (!hierarchy[model.id]) {
        rootNodes.push({
          created: model.created,
          id: model.id,
          object: model.object,
          children: [],
        });
      }
    }
    console.log(rootNodes);

    // Return the root nodes with their children sorted by created timestamp and permission property removed
    for (let parent of rootNodes) {
      parent.children = hierarchy[parent.id].children;
    }
    return rootNodes;
  }

  function getModelPurposes(modelName) {
    const purposes = [];

    if (modelName.includes("edit") || modelName.includes("code")) {
      purposes.push("edit_code");
    }

    if (modelName.includes("search") || modelName.includes("query")) {
      purposes.push("search");
    }

    if (modelName.includes("similarity")) {
      purposes.push("text_similarity");
    }

    if (modelName.includes("instruct")) {
      purposes.push("instruction");
    }

    if (modelName.includes("turbo")) {
      purposes.push("turbo");
    }

    if (modelName.includes("whisper")) {
      purposes.push("voice");
    }

    if (modelName.includes("embedding")) {
      purposes.push("text_embedding");
    }

    if (modelName.includes("gpt-3.5")) {
      purposes.push("advanced_generation");
    }

    if (modelName.includes("cushman")) {
      purposes.push("cushman");
    }

    if (modelName.includes("if-")) {
      purposes.push("integrated");
    }

    if (modelName.includes("ada")) {
      purposes.push("text_generation");
    }

    if (modelName.includes("babbage")) {
      purposes.push("general_purpose");
    }

    if (modelName.includes("curie")) {
      purposes.push("text_generation");
    }

    if (modelName.includes("davinci")) {
      purposes.push("general_purpose");
    }

    return purposes;
  }

  function flattenAndSort(data) {
    const newData = data.map(({ permission, created, ...model }) => {
      console.log(model.id);
      const purposes = getModelPurposes(model.id);
      console.log(purposes);
      // If `permission` has a `created` property, move the other properties to `model`
      if (permission && permission.created) {
        model = { ...model, purposes: purposes, ...permission };
      }
      return { ...model, purposes };
    });

    // Sort the new data by the `created` property
    newData.sort((a, b) => b.created - a.created);

    return newData;
  }

  async function getModels() {
    const response = await fetch("/api/models", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      // body: JSON.stringify(options),
    });
    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const { data } = await response.json();
    // const hierarchy = hierarchyStructure(data);
    // console.log(hierarchy);
    const flattenedAndSorted = flattenAndSort(data);
    console.log(flattenedAndSorted);
    // console.log(data);
    // console.log(JSON.stringify(data.map((d) => d.id)));
    if (!data) {
      return;
    } else setModels(flattenedAndSorted);
  }

  // useEffect(() => getModels(), []);
  return (
    <div>
      <Head>
        <title>GPT 3 Models are super fast</title>
      </Head>
      <Sidebar show={asideExpanded}>
        <ChatSettingsControl aiType='classic' />
        {/* <EngineSelector
          engines={engines}
          changeEngineHandler={(e) => {
            let engineType = e.currentTarget.value;
            setActiveEngine(engines.find((eng) => eng.key === engineType));
          }}></EngineSelector> */}
        <GroupRadioButtons
          items={[
            ...engines.map((engine) => {
              return {
                text: engine.name,
                value: engine.key,
                isActive: engine.key === activeEngine.key,
              };
            }),
          ]}
          changeHandler={(e) =>
            setActiveEngine(engines.find((eng) => eng.key === e))
          }></GroupRadioButtons>
        <ColorfulButtonSet items={AIstate}></ColorfulButtonSet>
      </Sidebar>
      <Header></Header>
      <Box>
        <OrdinaryButton
          text={"get models"}
          handleOnClick={() => getModels()}
          icon={"æ"}></OrdinaryButton>
        {models.length > 0 && <ResponsiveTable data={models}></ResponsiveTable>}
      </Box>
    </div>
  );
}
