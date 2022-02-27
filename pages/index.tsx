import { useState } from 'react';
import querystring from 'querystring';
import {
  Input,
  InputGroup,
  InputLeftAddon,
  Textarea,
  Button,
  Box,
  Text,
  Badge,
} from '@chakra-ui/react';
import codes from 'country-calling-code';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import encodeUrl from 'src/encodeUrl';

const animatedComponents = makeAnimated();

export default function index() {
  const [countryOption, setCountryOption] = useState({
    label: 'Nigeria',
    value: '234',
  });
  const [phoneNumber, setPhoneNumber] = useState('');
  const [textToEncode, setTextToEncode] = useState('');
  const [encodedUrl, setEncodedUrl] = useState('');
  const [copied, setCopied] = useState(false);

  const options = codes.map((country) => ({
    label: country.country,
    value: country.countryCodes[0],
  }));

  const handleCountryCodeChange = (selectedOption) => {
    setCountryOption(selectedOption);
  };

  const handlePhoneNumber = (e) => {
    setPhoneNumber(e.target.value);
  };

  const handleTextToEncode = (e) => {
    setTextToEncode(e.target.value);
  };

  const handleCopy = () => {
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 3000);
  };
  const handleEncoding = () => {
    const encodedText = querystring.stringify({ text: textToEncode });
    const encodedUrl = encodeUrl(
      `${countryOption.value}${phoneNumber}`,
      encodedText,
    );
    setEncodedUrl(encodedUrl);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        minH: '100vh',
      }}
    >
      <Box
        sx={{
          bgColor: '#128c7e',
          w: '100%',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            maxWidth: '800px',
            w: '100%',
            marginLeft: 'auto',
            marginRight: 'auto',
            paddingX: '10px',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              h: 'auto',
              alignItems: 'center',
              py: '10px',
              w: '100%',
            }}
          >
            <Text color="white" fontSize="2xl" fontWeight="bold">
              WhatsApp URL encoder
            </Text>
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          maxWidth: '800px',
          w: '100%',
          marginLeft: 'auto',
          marginRight: 'auto',
          paddingX: '10px',
        }}
      >
        <Box mt="15px">
          <Text mb="10px"> Select your country</Text>

          <Select
            aria-label="country code"
            components={animatedComponents}
            options={options}
            isSearchable
            name="country_code"
            value={countryOption}
            onChange={handleCountryCodeChange}
            placeholder="Select Country"
          />

          <InputGroup my="15px">
            <InputLeftAddon children={countryOption.value} />
            <Input
              type="tel"
              placeholder="WhatsApp number"
              value={phoneNumber}
              onChange={handlePhoneNumber}
            />
          </InputGroup>

          <Textarea
            placeholder="text to encode"
            size="lg"
            value={textToEncode}
            onChange={handleTextToEncode}
            mb="15px"
          />

          <Button
            variant="solid"
            colorScheme="whatsapp"
            onClick={handleEncoding}
            isFullWidth
            mb="20px"
          >
            Encode
          </Button>

          {encodedUrl && (
            <CopyToClipboard text={encodedUrl} onCopy={handleCopy}>
              <Box
                sx={{
                  position: 'relative',
                  bgColor: '#eee',
                  padding: '7px 19px',
                  borderRadius: '5px',
                }}
              >
                <Text isTruncated>{encodedUrl}</Text>
                <Badge
                  variant="solid"
                  colorScheme="messenger"
                  sx={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                  }}
                >
                  {copied ? 'Copied' : 'Copy'}
                </Badge>
              </Box>
            </CopyToClipboard>
          )}
        </Box>
      </Box>
    </Box>
  );
}
