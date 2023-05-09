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

export function hierarchyStructure(data) {
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
  // console.log(rootNodes);

  // Return the root nodes with their children sorted by created timestamp and permission property removed
  for (let parent of rootNodes) {
    parent.children = hierarchy[parent.id].children;
  }
  return rootNodes;
}

export function getModelPurposes(modelName) {
  const types = [];

  if (modelName.includes("edit") && modelName.includes("code")) {
    types.push("edit_code");
  }
  if (modelName.includes("code") && modelName.includes("code") === false) {
    types.push("write_code");
  }

  if (modelName.includes("search") || modelName.includes("query")) {
    types.push("search");
  }

  if (modelName.includes("similarity")) {
    types.push("text_similarity");
  }

  if (modelName.includes("text")) {
    types.push("text_generation");
  }

  if (modelName.includes("insert")) {
    types.push("text_insertion");
  }

  if (modelName.includes("instruct")) {
    types.push("instruction");
  }

  if (modelName.includes("turbo")) {
    types.push("turbo");
  }

  if (modelName.includes("whisper")) {
    types.push("voice");
  }

  if (modelName.includes("embedding")) {
    types.push("text_embedding");
  }

  if (modelName.includes("gpt-3.5")) {
    types.push("advanced_generation");
  }

  if (modelName.includes("cushman")) {
    types.push("cushman");
  }

  if (modelName.includes("if-")) {
    types.push("conditional");
  }

  if (modelName.includes("ada")) {
    if (types.includes("text_generation") === false)
      types.push("text_generation");
    types.push("ada");
  }

  if (modelName.includes("babbage")) {
    types.push("general_purpose");
    types.push("babbage");
  }

  if (modelName.includes("curie")) {
    types.push("text_generation");
    types.push("curie");
  }

  if (modelName.includes("davinci")) {
    types.push("general_purpose");
    types.push("davinci");
  }

  const unique = [...new Set(types)];
  return unique;
}

export function flattenAndSort(data) {
  const newData = data.map(({ permission, created, ...model }) => {
    // console.log(model.id);
    const types = getModelPurposes(model.id);
    //console.log(types);
    // If `permission` has a `created` property, move the other properties to `model`
    if (permission && permission.created) {
      model = { ...model, types: types, ...permission };
    }
    return { ...model, types };
  });

  // Sort the new data by the `created` property
  newData.sort((a, b) => b.created - a.created);

  return newData;
}
