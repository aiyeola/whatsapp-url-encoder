import { useState } from 'react';
import querystring from 'querystring';
import {
  Input,
  InputGroup,
  InputLeftAddon,
  Textarea,
  Button,
  Box,
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
    const encodedUrl = encodeUrl(phoneNumber, encodedText);
    setEncodedUrl(encodedUrl);
  };

  return (
    <>
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

      <InputGroup>
        <InputLeftAddon children={countryOption.value} />
        <Input
          type="tel"
          placeholder="WhatsApp number"
          value={phoneNumber}
          onChange={handlePhoneNumber}
        />
      </InputGroup>

      <Textarea
        placeholder="piece of text you wanna encode"
        size="sm"
        value={textToEncode}
        onChange={handleTextToEncode}
      />

      <Button onClick={handleEncoding}>Encode</Button>

      <CopyToClipboard text={encodedUrl} onCopy={handleCopy}>
        <Box>{encodedUrl}</Box>
      </CopyToClipboard>
    </>
  );
}
