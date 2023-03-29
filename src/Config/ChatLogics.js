export const getSender = (loggedUser, users) => {
  return users[0]?._id === loggedUser?._id ? users[0].name : users[1].name;
};
export const getSenderPic = (loggedUser, users) => {
  return users[0]?._id === loggedUser?._id ? users[0].pic : users[1].pic;
};
