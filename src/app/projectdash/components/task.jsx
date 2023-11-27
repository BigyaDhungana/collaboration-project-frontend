import { useState } from "react";
import "../css/tasks.css";
import {
  Button,
  ButtonIcon,
  ButtonText,
  Center,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Text,
} from "@gluestack-ui/themed";
import { MdOutlineDocumentScanner } from "react-icons/md";
import { LuListTodo } from "react-icons/lu";
import { TbProgress } from "react-icons/tb";
import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";
import { useMutation } from "@tanstack/react-query";
import { useLocalData } from "../../../hooks/useLocalData";
import { showToast } from "../../../utils/toasT";
import { updataTodoApi } from "../../../apiFunc/todos";
import { MdOutlineDelete } from "react-icons/md";

const Task = ({ task, taskType, refetchFunc, reload, setReload }) => {
  const [showModal, setShowModal] = useState(false);
  const { authToken, isMounted, metaData } = useLocalData();

  // if (isMounted) {
  //   for (let i=0;i<metaData.length;i++){
  //     for (let j=0;j<metaData[i].teams.length;j++){
  //       if (metaData[i].teams[j].id === task.team){
  //         console.log(metaData[i].teams[j].isLead)
  //       }
  //     }
  // } 

  const updateTodoResponse = useMutation({
    mutationFn: (statusId) =>
      updataTodoApi(authToken, {
        todo: Number(task.id),
        status: Number(statusId),
      }),
    onSuccess: () => {
      showToast("Task updated", "success");
      setReload(!reload);
      refetchFunc.refetch();
    },
    onError: () => {
      showToast("Task update failed", "error");
    },
  });

  const buttonState = {
    todo: taskType === "TODO",
    inProgress: taskType === "In Progress",
    completed: taskType === "Completed",
  };

  const handleButtonpress = (taskDestination) => {
    if (taskDestination === "todo") {
      updateTodoResponse.mutate(0);
    } else if (taskDestination === "inProgress") {
      updateTodoResponse.mutate(1);
    } else if (taskDestination === "completed") {
      updateTodoResponse.mutate(2);
    }
  };

  const handleDesc = (taskName) => {
    setShowModal(true);
  };

  return (
    <>
      <div className="task-container">
        <div className="task-text">
          <Text size="lg">{task.title}</Text>
        </div>
        <div className="task-icons">
          <div className="btn">
            <Tooltip tooltiptext="task description" />
            <Button
              action="positive"
              onPress={() => handleDesc(task)}
              size="sm"
            >
              <ButtonIcon>
                <MdOutlineDocumentScanner />
              </ButtonIcon>
            </Button>
          </div>

          {/* todos */}
          <div className="btn">
            <Tooltip tooltiptext="move to todo" />
            <Button
              action="positive"
              isDisabled={buttonState.todo}
              onPress={() => {
                handleButtonpress("todo");
              }}
              size="sm"
            >
              <ButtonIcon>
                <LuListTodo />
              </ButtonIcon>
            </Button>
          </div>

          {/* progess */}
          <div className="btn">
            <Tooltip tooltiptext="move to in progress" />
            <Button
              action="positive"
              isDisabled={buttonState.inProgress}
              onPress={() => {
                handleButtonpress("inProgress");
              }}
              size="sm"
            >
              <ButtonIcon>
                <TbProgress />
              </ButtonIcon>
            </Button>
          </div>

          {/* completed */}
          <div className="btn">
            <Tooltip tooltiptext="move to completed" />
            <Button
              action="positive"
              isDisabled={buttonState.completed}
              onPress={() => {
                handleButtonpress("completed");
              }}
              size="sm"
            >
              <ButtonIcon>
                <IoCheckmarkDoneCircleOutline />
              </ButtonIcon>
            </Button>
          </div>
        </div>
      </div>
      <Modal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
        }}
        size="lg"
      >
        <ModalContent>
          <Center>
            <ModalHeader>{task.title}</ModalHeader>
            <div className="del">
              <Button  action="negative">
                <ButtonIcon>
                  <MdOutlineDelete />
                </ButtonIcon>
              </Button>
            </div>
          </Center>
          <ModalBody>{task.body}</ModalBody>
          <Center>
            <ModalFooter>
              <Button
                action="negative"
                onPress={() => {
                  setShowModal(false);
                }}
              >
                <ButtonText>Close</ButtonText>
              </Button>
            </ModalFooter>
          </Center>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Task;

const Tooltip = ({ tooltiptext }) => {
  return <span className="tooltiptext"> {tooltiptext}</span>;
};