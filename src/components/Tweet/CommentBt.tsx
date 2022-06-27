import { Icon } from "@chakra-ui/icons";
import {
  Avatar,
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { BsChatSquareDotsFill } from "react-icons/bs";
import { auth, db } from "src/firebase";
import { CommentList } from "./CommentList";

type Log = {
  id: number;
  avatar?: string;
  hunterName: string;
  comment: string;
  time: string;
};

type User = {
  uid: string;
  email: string;
  username: string;
  avatar?: string;
};

export const CommentBt = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  const [user, setUser] = useState<Partial<User>>();
  const [time, setTime] = useState<string[]>([]);
  const [comment, setComment] = useState<string>("");
  const [commentBox, setCommentBox] = useState<string[]>([]);
  const removeUndefind = commentBox.filter((v) => v);

  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const date = today.getDate();
  const hours = today.getHours();
  const minutes = today.getMinutes();
  const now = [year + "/" + month + "/" + date + "/" + hours + ":" + minutes];

  const commentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    setComment(e.target.value);
  const timeChange = (e: any) => setTime(e.target.value);

  const Sent = () => {
    setCommentBox((pre) => [...pre, comment]);
    onClose();
    setComment("");
    setTime([...time, ...now]);
  };

  const uid = auth.currentUser?.uid;
  useEffect(() => {
    db.collection("users")
      .doc(uid)
      .get()
      .then((doc) => {
        const data = doc.data();
        setUser(data);
      });
    // eslint-disable-next-line
  }, []);
  const getName: any = user?.username;
  const getAvatar: any = user?.avatar;

  const logBox: Log[] = [];
  for (let i = 0; i < removeUndefind.length; i++) {
    logBox.push({
      id: i,
      avatar: getAvatar,
      hunterName: getName,
      comment: removeUndefind[i],
      time: time[i],
    });
  }

  const contents = logBox.map((item: Log) => {
    return (
      <Box key={item.id} mb="20px" borderBottom="1px solid gray">
        <Flex align="center" justify="space-between" mb="8px">
          <Flex align="center">
            <Avatar size="sm" mr="8px" src={item.avatar} />
            <Box fontSize={{ base: "12px", md: "16px" }}>
              {item.hunterName ? item.hunterName : "名無しさん"}
            </Box>
          </Flex>

          <Flex fontSize={{ base: "10px", md: "16px" }} onChange={timeChange}>
            {item.time}
          </Flex>
        </Flex>
        <Box fontSize={{ base: "11px", md: "16px" }}>{item.comment}</Box>
      </Box>
    );
  });

  return (
    <>
      <Icon
        as={BsChatSquareDotsFill}
        onClick={onOpen}
        fontSize={{ base: "12px", md: "16px" }}
      />

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent bgColor="gray.200">
          <ModalHeader>Create Comment</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              {/* // dbからログイン中のユーザー名を表示する */}
              <FormLabel fontWeight="700">HunterName</FormLabel>
              <Textarea
                h="130px"
                mt="3px"
                bgColor="white"
                ref={initialRef}
                placeholder="ハッピーなコメントを！"
                value={comment}
                onChange={commentChange}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button onClick={Sent} colorScheme="blue" mr={3} size="sm">
              Sent
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Box fontSize={{ base: "11px", md: "16px" }}>{removeUndefind.length}</Box>

      <CommentList removeUndefind={removeUndefind} contents={contents} />
    </>
  );
};
