import { useState } from 'react';
import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Heading,
  Input,
  NumberInput,
  NumberInputField,
  Select,
  VStack,
  useToast,
  Card,
  CardBody,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import type { InboundFormData, InboundFormErrors, Location } from '../types';
import { useInventoryStore } from '../store/inventoryStore';
import { isValidFutureDate } from '../utils/date';
import { useFetch } from '../hooks/useFetch';
import { fetchLocations } from '../services/api';
import { useEffect } from 'react';

const initialFormData: InboundFormData = {
  sku: '',
  name: '',
  batch: '',
  expiry_date: '',
  qty: 0,
  location: '',
};

export function AddInboundPage() {
  const navigate = useNavigate();
  const toast = useToast({
    position: 'top',
    containerStyle: {
      marginTop: '77px',
    },
  });
  const { addItem } = useInventoryStore();
  
  const [formData, setFormData] = useState<InboundFormData>(initialFormData);
  const [errors, setErrors] = useState<InboundFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { data: locations, status, refetch } = useFetch<Location[]>(fetchLocations);

  // Fetch once on mount; including `refetch` to satisfy hooks rule
  useEffect(() => {
    refetch();
  }, [refetch]);

  const handleChange = (field: keyof InboundFormData, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: InboundFormErrors = {};

    if (!formData.sku.trim()) {
      newErrors.sku = 'SKU is required';
    }

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.batch.trim()) {
      newErrors.batch = 'Batch is required';
    }

    if (!formData.expiry_date) {
      newErrors.expiry_date = 'Expiry date is required';
    } else if (!isValidFutureDate(formData.expiry_date)) {
      newErrors.expiry_date = 'Expiry date must be today or in the future';
    }

    if (formData.qty <= 0) {
      newErrors.qty = 'Quantity must be greater than 0';
    }

    if (!formData.location) {
      newErrors.location = 'Location is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast({
        title: 'Validation Error',
        description: 'Please fix all errors before submitting',
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top',
      });
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Add to store
    addItem({
      sku: formData.sku,
      name: formData.name,
      batch: formData.batch,
      expiry: formData.expiry_date,
      qty: formData.qty,
      location: formData.location,
    });

    toast({
      title: 'Success!',
      description: `${formData.name} has been added to inventory`,
      status: 'success',
      duration: 3000,
      isClosable: true,
      position: 'top',
    });

    setIsSubmitting(false);
    navigate('/inventory');
  };

  return (
    <Container maxW="container.md" py={8}>
      <Card>
        <CardBody>
          <VStack align="stretch" spacing={6}>
            <Heading size="lg">Add New Item</Heading>

            <form onSubmit={handleSubmit}>
              <VStack spacing={4} align="stretch">
                {/* SKU */}
                <FormControl isInvalid={!!errors.sku} isRequired>
                  <FormLabel>SKU</FormLabel>
                  <Input
                    value={formData.sku}
                    onChange={(e) => handleChange('sku', e.target.value)}
                    placeholder="e.g., ICE-001"
                  />
                  <FormErrorMessage>{errors.sku}</FormErrorMessage>
                </FormControl>

                {/* Name */}
                <FormControl isInvalid={!!errors.name} isRequired>
                  <FormLabel>Product Name</FormLabel>
                  <Input
                    value={formData.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    placeholder="e.g., Ice Cream Vanilla"
                  />
                  <FormErrorMessage>{errors.name}</FormErrorMessage>
                </FormControl>

                {/* Batch */}
                <FormControl isInvalid={!!errors.batch} isRequired>
                  <FormLabel>Batch Number</FormLabel>
                  <Input
                    value={formData.batch}
                    onChange={(e) => handleChange('batch', e.target.value)}
                    placeholder="e.g., B-202510"
                  />
                  <FormErrorMessage>{errors.batch}</FormErrorMessage>
                </FormControl>

                {/* Expiry Date */}
                <FormControl isInvalid={!!errors.expiry_date} isRequired>
                  <FormLabel>Expiry Date</FormLabel>
                  <Input
                    type="date"
                    value={formData.expiry_date}
                    onChange={(e) => handleChange('expiry_date', e.target.value)}
                  />
                  <FormErrorMessage>{errors.expiry_date}</FormErrorMessage>
                </FormControl>

                {/* Quantity */}
                <FormControl isInvalid={!!errors.qty} isRequired>
                  <FormLabel>Quantity</FormLabel>
                  <NumberInput
                    min={1}
                    value={formData.qty}
                    onChange={(_, valueAsNumber) =>
                      handleChange('qty', isNaN(valueAsNumber) ? 0 : valueAsNumber)
                    }
                  >
                    <NumberInputField placeholder="Enter quantity" />
                  </NumberInput>
                  <FormErrorMessage>{errors.qty}</FormErrorMessage>
                </FormControl>

                {/* Location */}
                <FormControl isInvalid={!!errors.location} isRequired>
                  <FormLabel>Storage Location</FormLabel>
                  <Select
                    placeholder="Select location"
                    value={formData.location}
                    onChange={(e) => handleChange('location', e.target.value)}
                    isDisabled={status === 'loading'}
                  >
                    {locations?.map((loc) => (
                      <option key={loc.id} value={loc.id}>
                        {loc.label}
                      </option>
                    ))}
                  </Select>
                  <FormErrorMessage>{errors.location}</FormErrorMessage>
                </FormControl>

                {/* Submit Buttons */}
                <Box pt={4}>
                  <VStack spacing={3}>
                    <Button
                      type="submit"
                      colorScheme="blue"
                      size="lg"
                      width="full"
                      isLoading={isSubmitting}
                      loadingText="Submitting..."
                    >
                      Add to Inventory
                    </Button>
                    <Button
                      variant="ghost"
                      width="full"
                      onClick={() => navigate('/inventory')}
                      isDisabled={isSubmitting}
                    >
                      Cancel
                    </Button>
                  </VStack>
                </Box>
              </VStack>
            </form>
          </VStack>
        </CardBody>
      </Card>
    </Container>
  );
}
