import { useFormWithMutation } from "../hooks/useForm";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Container,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";

const schema = z.object({
  email: z.string().email("Nieprawidłowy email"),
  password: z.string().min(1, "Hasło jest wymagane"),
});

type LoginFormValues = z.infer<typeof schema>;

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const { form, onSubmit, isLoading, error } =
    useFormWithMutation<LoginFormValues>(
      schema,
      ({ email, password }) => login(email, password),
      {
        onSuccess: () => {
          navigate("/notes");
        },
      }
    );

  const {
    register,
    formState: { errors },
  } = form;

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
        }}
      >
        <Typography variant="h5" component="h1">
          Logowanie
        </Typography>

        {error && (
          <Alert severity="error" sx={{ width: "100%" }}>
            {axios.isAxiosError(error)
              ? error.message ?? "Wystąpił błąd logowania"
              : error.message}
          </Alert>
        )}

        <Box
          component="form"
          onSubmit={onSubmit}
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <TextField
            label="Email"
            type="email"
            fullWidth
            {...register("email")}
            error={!!errors.email}
            helperText={errors.email?.message}
          />

          <TextField
            label="Hasło"
            type="password"
            fullWidth
            {...register("password")}
            error={!!errors.password}
            helperText={errors.password?.message}
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={isLoading}
            sx={{ mt: 1 }}
          >
            {isLoading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Zaloguj się"
            )}
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
