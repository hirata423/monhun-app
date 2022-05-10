import { Box, Flex, Heading, Input, Stack } from "@chakra-ui/react";
import { useState } from "react";

import { useKoilDate } from "../../hooks/useKoilDate";
import { BuguType } from "../../types/BuguType";
import KoilFix from "./KoilFix";

export const Koil = () => {
  const [defaultHelm, setDefaultHelm] = useState("");
  const { koilList } = useKoilDate();

  const changeHelm = (e: any) => setDefaultHelm(e.target.value);

  const filterItem = koilList.filter((item: BuguType) => {
    const itemKey =
      item.name +
      item.subName +
      item.skill.firstSK +
      item.skill.secondSK +
      item.skill.thirdSK;
    return itemKey.includes(defaultHelm);
  });

  const mapItem = filterItem.map((item: BuguType) => {
    return (
      <Box
        display={!defaultHelm ? "none" : "block"}
        borderBottom="1px solid black"
        key={item.id}
        fontSize="18px"
      >
        <KoilFix {...item} />
      </Box>
    );
  });

  return (
    <Flex>
      <Flex>
        <Heading fontSize="25px">コイル　：</Heading>
      </Flex>
      <Box>
        <Box>
          <Input
            placeholder="キーワードを入力"
            w="300px"
            h="30px"
            top="-5px"
            value={defaultHelm}
            onChange={changeHelm}
          />
        </Box>
        {mapItem}
        <Stack spacing="15px" m="15px">
          <Box display={defaultHelm ? "none" : "block"} fontSize="18px">
            武具名：
          </Box>
        </Stack>
      </Box>
    </Flex>
  );
};

export default Koil;
