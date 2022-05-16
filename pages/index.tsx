import { useState, useRef, useEffect } from 'react';
import querystring from 'querystring';
import {
  Input,
  InputGroup,
  Textarea,
  Button,
  Box,
  Text,
  Badge,
  Flex,
} from '@chakra-ui/react';
import intlTelInput from 'intl-tel-input';
import 'intl-tel-input/build/css/intlTelInput.css';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useForm, Controller } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';
import JoiExtPhoneNumber from 'joi-ext-phonenumber';

import encodeUrl from 'src/encodeUrl';

export default function index() {
  const [encodedUrl, setEncodedUrl] = useState('');
  const [copied, setCopied] = useState(false);
  const [regionCode, setRegionCode] = useState('NG');

  const inputRef = useRef(null);

  useEffect(() => {
    const phoneNumber = intlTelInput(inputRef.current, {
      utilsScript:
        'https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.16/js/utils.min.js',
      preferredCountries: ['NG'],
    });

    function handleCountryChange(_e) {
      const selectedCountryRegionCode =
        phoneNumber.getSelectedCountryData().iso2;

      setRegionCode(selectedCountryRegionCode.toUpperCase());
    }

    inputRef.current.addEventListener('countrychange', handleCountryChange);
    return () =>
      inputRef.current.removeEventListener(
        'countrychange',
        handleCountryChange,
      );
  }, []);

  const schema = Joi.object().keys({
    phoneNumber: Joi.extend(JoiExtPhoneNumber)
      .string()
      .phoneNumber({
        defaultRegionCode: regionCode,
        format: 'e164',
        strict: true,
      })
      .messages({
        'string.empty': 'WhatsApp phone number is required',
        'phoneNumber.strict':
          '{{#label}} does not match pattern for the regions phone number',
      }),
    textToEncode: Joi.string().required().messages({
      'string.empty': 'Please enter text to encode',
    }),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: joiResolver(schema),
    defaultValues: {
      phoneNumber: '',
      textToEncode: '',
    },
  });

  const handleCopy = () => {
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 3000);
  };

  const handleEncoding = (phoneNumber, textToEncode) => {
    const encodedText = querystring.stringify({ text: textToEncode });
    const encodedUrl = encodeUrl(`${phoneNumber}`, encodedText);
    setEncodedUrl(encodedUrl);
  };

  const onSubmit = (data) =>
    handleEncoding(data.phoneNumber, data.textToEncode);

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
          <Text mb="10px">Enter phone number, text to encode and viola</Text>

          <Flex
            direction="column"
            as="form"
            onSubmit={handleSubmit(onSubmit)}
            w="100%"
          >
            <Controller
              name="phoneNumber"
              control={control}
              render={({ field }) => (
                <Flex direction="column" my="15px">
                  <InputGroup mb="5px">
                    <Input type="tel" {...field} ref={inputRef} />
                  </InputGroup>
                  <Text color="red">
                    {errors.phoneNumber && errors.phoneNumber.message}
                  </Text>
                </Flex>
              )}
            />

            <Controller
              name="textToEncode"
              control={control}
              render={({ field }) => (
                <Flex direction="column" my="15px">
                  <Textarea
                    placeholder="text to encode"
                    size="lg"
                    {...field}
                    mb="5px"
                  />
                  <Text color="red">
                    {errors.textToEncode && errors.textToEncode.message}
                  </Text>
                </Flex>
              )}
            />

            <Button
              variant="solid"
              colorScheme="whatsapp"
              isFullWidth
              type="submit"
              mb="20px"
            >
              Encode
            </Button>
          </Flex>

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
