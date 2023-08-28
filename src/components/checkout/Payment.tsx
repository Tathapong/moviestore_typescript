import { forwardRef } from "react";

import qrCode from "../../assets/qrcode.jpeg";
import { Box, Container, Typography } from "@mui/material";
import ScheduleIcon from "@mui/icons-material/Schedule";
import useAllContext from "../../contexts/useAllContext";

interface PaymentProps {
  paymentStart: number;
  paymentStop: number;
}

const Payment = forwardRef(({ paymentStart, paymentStop }: PaymentProps) => {
  const context = useAllContext();

  return (
    <Container maxWidth="xs" sx={{ py: 20 }}>
      <Box display={"flex"} flexDirection={"column"} alignItems={"center"} bgcolor={"white"} p={2} borderRadius={3}>
        <Typography variant="h3" fontWeight={500} color={"#7B1A78"}>
          PAYNOW
        </Typography>
        <Box display={"flex"} alignItems={"center"}>
          <ScheduleIcon />
          {paymentStart ? (
            <Typography>{context.timer - Math.round((paymentStop - paymentStart) / 1000)}</Typography>
          ) : (
            ""
          )}
        </Box>
        <Typography fontWeight={500}>Scan the QR code to pay</Typography>
        <Box component={"img"} src={qrCode} width={"100%"} />
        <Typography variant="h4" fontWeight={500}>{`$${(context.total * (1 - context.discount)).toFixed(
          2
        )}`}</Typography>
      </Box>
    </Container>
  );
});

export default Payment;
