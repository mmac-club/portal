import { Button, Card, Heading, Link, Text, Box } from '@chakra-ui/react'
import React from 'react'


const PaymentConfirmation = ({status}) => {
  if (!status) {
    return "";
  }
  return status == "Successful" ? (
        <div>
            <Heading
                size='2xl'
                mb={6}
                color={"#408140"}
                textAlign={{base:"left", lg: "center"}}
            >
                Thank You!
            </Heading>
            <Box
                padding={4}
                textAlign={'left'}
            >
                <Heading size='lg' mb={6}>Payment Confirmation</Heading>
                <Text mb={6}>
                    Thank you for your payment! Your transaction has been successfully processed and confirmed.
                    We appreciate your business and trust in our MMAC.
                </Text>
                <Text mb={1} fontWeight='semibold'>
                    What's Next?
                </Text>
                <Text mb={6}>
                    For any queries or concerns, please dont't hesitate to contact our customer support team at &nbsp;
                    <Link color={"#0000FF"} fontWeight='semibold' href="mailto:support@gmail.com">support@gmail.com</Link> or call us at <Link fontWeight='semibold' color='#0000FF' href="#">+1 555 555 5555</Link>.
                </Text>
                <Text mb={6}>
                    Once Again, thank you for choosing MMAC, We look forward to serving you again soon!
                </Text>
            </Box>
        </div>
    ) : (
        <div>
            <Heading
                size='2xl'
                mb={6}
                color={"#AF0000"}
                textAlign={{base:"left", lg: "center"}}
            >Payment Unsuccessfull!</Heading>
            <Box
                padding={4}
                textAlign={'left'}
            >
                <Heading size='lg'  mb={6}>Payment Unsuccessfull</Heading>
                <Text mb={6}>
                    We're sorry, but it appears that your payment did not go through successfully.
                </Text>
                <Text mb={1} fontWeight='semibold'>
                    What can you do next?
                </Text>
                <Text mb={6}>
                    Check payment details; Ensure that the payment information provided is accurate and try again.
                </Text>
                <Text mb={6}>
                    For further assistance or questions regarding your payment, please reach to our customer support team at &nbsp;
                    <Link color={"#0000FF"} fontWeight='semibold' href="mailto:support@gmail.com">support@gmail.com</Link> or call us at <Link fontWeight='semibold' color='#0000FF' href="#">+1 555 555 5555</Link>.
                </Text>
                <Text mb={6}>
                    We apologize for any inconvinience this may have caused. Your satisfaction is important to us, 
                    and we're here to help resolve any issuees you may encounter.
                </Text>
            </Box>
        </div>
    )
}

export default PaymentConfirmation