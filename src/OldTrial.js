// Simple version of updating Read status

// const toggleRead = async () => {
//   const ReadUpdate = ref(Read.value)
//   console.log("Read :", Read.value, "ReadUpdate :", ReadUpdate.value, "message_id :", message_id.value)
//   Read.value = !Read.value

//   await updateDoc(doc(collection(db, "messages"), message_id.value), { Read: !ReadUpdate.value })


// Optimistic Update Read status :
// const toggleRead = async (property) => {
//   const PrevProperty = ref(Read.value)
//   console.log("Read :", Read.value, "ReadUpdate :", ReadUpdate.value, "message_id :", message_id.value)
//   if(property === "Read") Read.value = !Read.value
//   else if(property === "Star") Status.Star.value = !Status.Star.value
//   // And so on listing all 

//   try {
//     await updateDoc(doc(collection(db, "messages"), message_id.value), { 
//       [property]: !PrevProperty.value 
//     })
//     console.log("Document updated successfully", Read);
//   } catch (error) {
//     console.log("props.mprop.message.Read :", Read)
//     console.error("Error updating document:", error);
//     Read.value = ReadUpdate
//   }
// }


// // Optimistic Update Read status :
// const toggleRead = async () => {
//   const ReadUpdate = ref(Read.value)
//   console.log("Read :", Read.value, "ReadUpdate :", ReadUpdate.value, "message_id :", message_id.value)
//   Read.value = !Read.value

//   try {
//     await updateDoc(doc(collection(db, "messages"), message_id.value), {
//       Read: !ReadUpdate.value
//     })
//     console.log("Document updated successfully", Read);
//   } catch (error) {
//     console.log("props.mprop.message.Read :", Read)
//     console.error("Error updating document:", error);
//     Read.value = ReadUpdate
//   }
// }
