import { ArrowForwardIcon } from "@chakra-ui/icons";
import { Box, Button, Flex, Heading, Text, } from "@chakra-ui/react";
import { Layout } from "@components";
import { useRouter } from "next/dist/client/router";
import Image from 'next/image'

const Home: React.FC = () => {
  const router = useRouter();

  return (
    <Layout title="Home">
      <Box w="100%" bg="orange.50">
        <Flex maxW="1200px" margin="auto" p={50} justify="space-between" alignItems="center">
          <Flex w="40%" flexDirection="column" justifyContent="center">
            <Heading as="h1" fontSize="50px" color="gray.700">
              The best books to learn anything!
            </Heading>
            <Text fontSize="2xl" mt={5}>Register and checkout our awesome offers</Text>
            <Button
              mt={5}
              onClick={() => router.push('/register')}
              width="fit-content"
              rightIcon={<ArrowForwardIcon />}
              colorScheme="gray">
              Register now
              </Button>
          </Flex>
          <Image
            src="/main.png"
            width={600}
            height={300}
          />
        </Flex>
      </Box>
    </Layout>)
};
export default Home;
