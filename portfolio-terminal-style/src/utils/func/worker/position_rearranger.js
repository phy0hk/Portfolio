self.onmessage = function (event) {
  const { openedAppList, currSelectedApp } = event;
  const indexOfCurrentApp = openedAppList.findIndex(
    (item) => item === currSelectedApp,
  );
  const temp = [];
  if (indexOfCurrentApp === 0) {
    self.postMessage(openedAppList);
  }
  const arrayFirstHalf = openedAppList.filter(
    (item, index) => index >= 0 && index < indexOfCurrentApp,
  );
  const arraySecondHalf = openedAppList.filter(
    (item, index) => index > indexOfCurrentApp && index < openedAppList.length,
  );
  const newArray = [currSelectedApp, ...arrayFirstHalf, ...arraySecondHalf];
  const updatedNewArray = newArray.map((item, index) => ({
    ...item,
    position: { x: item.position.x, y: item.position.y, z: 999 - index },
  }));
  self.postMessage(updatedNewArray);
};
