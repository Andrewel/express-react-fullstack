import { connectDB } from './connect-db';

/* TASK */
export const addNewTask = async (task) => {
  let db = await connectDB();
  let collection = db.collection(`tasks`);
  await collection.insertOne(task);
};

export const updateTask = async (task) => {
  let {
    id,
    group,
    isComplete,
    name,
    birthdate,
    address,
    phone,
    email,
    income,
    city,
    isOld,
    gender,
  } = task;
  let db = await connectDB();
  let collection = db.collection(`tasks`);
  if (group) {
    await collection.updateOne({ id }, { $set: { group } });
  }
  if (name) {
    await collection.updateOne({ id }, { $set: { name } });
  }
  if (birthdate) {
    await collection.updateOne({ id }, { $set: { birthdate } });
  }
  if (address) {
    await collection.updateOne({ id }, { $set: { address } });
  }
  if (phone) {
    await collection.updateOne({ id }, { $set: { phone } });
  }
  if (email) {
    await collection.updateOne({ id }, { $set: { email } });
  }
  if (income) {
    await collection.updateOne({ id }, { $set: { income } });
  }
  if (city) {
    await collection.updateOne({ id }, { $set: { city } });
  }
  if (gender) {
    await collection.updateOne({ id }, { $set: { gender } });
  }
  if (isOld !== undefined) {
    await collection.updateOne({ id }, { $set: { isOld } });
  }
  if (isComplete !== undefined) {
    await collection.updateOne({ id }, { $set: { isComplete } });
  }
};

export const deleteTask = async (id) => {
  let db = await connectDB();
  let collection = db.collection(`tasks`);
  await collection.deleteOne({ id });
};

/* DEPOSIT */
export const addNewDeposit = async (deposit) => {
  let db = await connectDB();
  let collection = db.collection(`deposits`);
  await collection.insertOne(deposit);
};

export const updateDeposit = async (deposit) => {
  let {
    id,
    group,
    isComplete,
    name,
    startdate,
    enddate,
    address,
    phone,
    email,
    income,
    city,
    isOld,
    gender,
  } = deposit;
  let db = await connectDB();
  let collection = db.collection(`deposits`);
  if (group) {
    await collection.updateOne({ id }, { $set: { group } });
  }
  if (name) {
    await collection.updateOne({ id }, { $set: { name } });
  }
  if (startdate) {
    await collection.updateOne({ id }, { $set: { startdate } });
  }
  if (enddate) {
    await collection.updateOne({ id }, { $set: { enddate } });
  }
  if (address) {
    await collection.updateOne({ id }, { $set: { address } });
  }
  if (phone) {
    await collection.updateOne({ id }, { $set: { phone } });
  }
  if (email) {
    await collection.updateOne({ id }, { $set: { email } });
  }
  if (income) {
    await collection.updateOne({ id }, { $set: { income } });
  }
  if (city) {
    await collection.updateOne({ id }, { $set: { city } });
  }
  if (gender) {
    await collection.updateOne({ id }, { $set: { gender } });
  }
  if (isOld !== undefined) {
    await collection.updateOne({ id }, { $set: { isOld } });
  }
  if (isComplete !== undefined) {
    await collection.updateOne({ id }, { $set: { isComplete } });
  }
};

export const deleteDeposit = async (id) => {
  let db = await connectDB();
  let collection = db.collection(`deposits`);
  await collection.deleteOne({ id });
};
