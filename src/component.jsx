import { useState, useEffect } from "react";
import Logo from "./Assets/logo.svg";

export default function Component() {
  const [assignments, setAssignments] = useState([]);
  const [impossible, setImpossible] = useState(false);

  const gameMasters = [
    { id: 1, name: 'John', trained_rooms: [2, 3] },
    { id: 2, name: 'Alice', trained_rooms: [4, 10] },
    { id: 3, name: 'David', trained_rooms: [5] },
    { id: 4, name: 'Emily', trained_rooms: [8, 6, 2, 7] },
    { id: 5, name: 'Michael', trained_rooms: [9, 1, 4, 3, 11, 8, 6, 12] },
    { id: 6, name: 'Sophia', trained_rooms: [7, 10] },
    { id: 7, name: 'Daniel', trained_rooms: [8] },
    { id: 8, name: 'Olivia', trained_rooms: [3, 9] },
    { id: 9, name: 'Matthew', trained_rooms: [2, 6, 1, 7, 3, 4] },
    { id: 10, name: 'Emma', trained_rooms: [5, 4] },
    { id: 11, name: 'James', trained_rooms: [11] },
    { id: 12, name: 'Isabella', trained_rooms: [7, 4, 12] },
    { id: 13, name: 'William', trained_rooms: [11] },
    { id: 14, name: 'Ava', trained_rooms: [9] },
    { id: 15, name: 'Benjamin', trained_rooms: [8, 4] },
    { id: 16, name: 'Mia', trained_rooms: [1, 3, 7, 5, 8] },
    { id: 17, name: 'Ethan', trained_rooms: [4, 2] },
    { id: 18, name: 'Charlotte', trained_rooms: [10] },
    { id: 19, name: 'Alexandre', trained_rooms: [9, 2, 8] },
    { id: 20, name: 'Harper', trained_rooms: [1, 12] }
  ];

  const rooms = [
    { id: 1, name: "Le Braquage à la francaise" },
    { id: 2, name: "Le Braquage de casino" },
    { id: 3, name: "L'Enlèvement" },
    { id: 4, name: "Le Métro" },
    { id: 5, name: "Les Catacombes" },
    { id: 6, name: "Assassin's Creed" },
    { id: 7, name: "L'Avion" },
    { id: 8, name: "La Mission spatiale" },
    { id: 9, name: "Le Tremblement de terre" },
    { id: 10, name: "Le Cinéma hanté" },
    { id: 11, name: "Le Farwest" },
    { id: 12, name: "Mission secrète" }
  ];

  const shuffleGameMasters = () => {
    return gameMasters.sort(() => Math.random() - 0.5);
  };

  const findGameMastersForRooms = () => {
    const assignments = new Array(rooms.length).fill(null);
    const availableGameMasters = shuffleGameMasters();

    const assignGameMaster = (roomIndex) => {
        if (roomIndex >= rooms.length) {
            return true; // All rooms have been assigned a game master
        }

        const room = rooms[roomIndex];
        const suitableGameMasters = availableGameMasters.filter(gm => gm.trained_rooms.includes(room.id));

        for (const gm of suitableGameMasters) {
            if (!assignments.some(assignment => assignment?.gameMaster.id === gm.id)) {
                assignments[roomIndex] = { room, gameMaster: gm };
                availableGameMasters.splice(availableGameMasters.indexOf(gm), 1);

                if (assignGameMaster(roomIndex + 1)) {
                    return true;
                }

                assignments[roomIndex] = null;
                availableGameMasters.push(gm);
            }
        }

        return false;
    };

    if (assignGameMaster(0)) {
        return assignments;
    } else {
        setImpossible(true);
        return null;
    }
};

  const rollDice = () => {
    setImpossible(false);
    shuffleGameMasters();
    let currentAssignements = findGameMastersForRooms()  
    setAssignments(currentAssignements);
  };
 
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <div className="w-full p-4 flex items-center mb-4">
        <img src={Logo} className="h-24 w-24 transform" style={{ transform: 'rotate(-15deg)' }} />
        <div className="w-full md:mr-0 lg:mr-24 flex justify-center">
          <h3 className="text-lg font-bold flex text-center items-center justify-center"> Assignateur de Game Masters</h3>
        </div>  
      </div>
      <div className="max-w-4xl w-full px-4 sm:px-6 md:px-8">
        <div className="flex justify-between gap-8 mb-8">
          <div className="w-full">
            <h3 className="text-lg font-bold">Game Masters</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-4">
              {gameMasters.map((master, index) => (
                <div key={index} className="bg-gray-800 rounded-lg shadow-lg p-2 flex text-center items-center justify-center">
                  {master.name}
                </div>
              ))}
            </div>
          </div>
          <div className="w-full">
            <h3 className="text-lg font-bold">Sessions</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 gap-4 text-center">
              {rooms.map((room, index) => (
                <div key={index} className="bg-gray-800 rounded-lg shadow-lg p-2 flex items-center justify-center">
                  {room.name}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex justify-center mb-8">
          <button
            onClick={rollDice}
            className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-full"
          >
            Attribuez les Game Masters !
          </button>
        </div>
        <div>
        {(assignments.length === 0 && !impossible) &&
          <div className="w-full">
            <div className="w-full text-3xl font-bold text-center"> Appuyez sur le boutton pour assigner les Game Masters ! </div>
          </div>
        }
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 p-6">
          {assignments.length > 0 && assignments.map((assignement, index) => (
            <div key={index} className="bg-gray-800 rounded-lg shadow-lg p-6 flex flex-col items-center justify-center">
              <div className="text-3xl font-bold">{assignement.gameMaster.name}</div>
              <div className="text-2xl font-medium text-center">{assignement.room.name}</div>
            </div>
          )) }
          {impossible &&
            <div className="w-full">
              <div className="w-full text-3xl font-bold"> Aucun assignement possible avec ces Game Masters </div>
            </div>
          }
        </div>
      </div>
    </div>
  )
}