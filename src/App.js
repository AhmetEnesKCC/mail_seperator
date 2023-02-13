import {
  Box,
  Button,
  CopyButton,
  FileInput,
  Group,
  Input,
  NumberInput,
  Stack,
  Text,
} from "@mantine/core";
import { useState, useMemo } from "react";

function App() {
  const [text, setText] = useState(null);
  const [startIndex, setStartIndex] = useState(1);
  const [endIndex, setEndIndex] = useState(10);

  const mutated = useMemo(() => {
    return text?.split("\n").splice(startIndex - 1, endIndex - startIndex + 1);
  }, [text, startIndex, endIndex]);

  return (
    <div className="App">
      <Stack p={24}>
        <FileInput
          onChange={(file) => {
            const reader = new FileReader();
            reader.addEventListener("loadend", () => {
              setText(reader.result);
            });
            reader.readAsText(file);
          }}
        />
        <Group>
          <NumberInput
            label="Başlangıç İndeksi"
            value={startIndex}
            onChange={setStartIndex}
            min={1}
          />
          <NumberInput
            label="Bitiş İndeksi"
            value={endIndex}
            onChange={setEndIndex}
          />
        </Group>
        {mutated && (
          <Box p={24}>
            <CopyButton
              value={
                mutated
                  ?.map((t) => {
                    if (t.split(",").length > 1) {
                      return t.split(",");
                    }
                    if (t.split(" - ").length > 1) {
                      return t.split(" - ");
                    }

                    return t;
                  })
                  ?.flat()
                  ?.filter((t) =>
                    /^[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*@[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*$/.test(
                      t.trim()
                    )
                  )

                  .join() + ","
              }
            >
              {({ copied, copy }) => (
                <Button color={copied ? "teal" : "blue"} onClick={copy}>
                  {copied ? "Kopyalandı" : "Vırgülle ayrılmış Kopyala"}
                </Button>
              )}
            </CopyButton>
            <Stack
              m={3}
              sx={{
                height: 400,
                overflow: "auto",
                boxShadow: "2px 2px 2px rgba(0,0,0,0.2)",
              }}
            >
              {mutated?.map((t, i) => (
                <Text>
                  <span>{startIndex + i}</span> {t.trim().replace('"', "")}
                </Text>
              ))}
            </Stack>
          </Box>
        )}
      </Stack>
    </div>
  );
}

export default App;
