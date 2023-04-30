import {addDoc, collection, doc, setDoc, Timestamp} from 'firebase/firestore';
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import React, {useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {toast} from 'react-toastify';
import styled from 'styled-components';
import {db, storage} from '../../../firebase/config';
import Card from '../../card/Card';
import {useSelector} from 'react-redux';
import {selectProducts} from '../../../redux/slice/productSlice';

const categories = [
  {id: 1, name: 'Jewelry & Accessories'},
  {id: 2, name: 'Clothing & Shoes'},
  {id: 3, name: 'Home & Living'},
  {id: 4, name: 'Wedding & Party'},
  {id: 5, name: 'Toys & Entertainment'},
  {id: 6, name: 'Art & Collectibles'},
  {id: 7, name: 'Craft Supplies & Tools'},
  {id: 8, name: 'Vintage'},
];

const brands = [
  {id: 1, name: 'FadenFactory'},
  {id: 2, name: 'QuriousShop'},
  {id: 3, name: 'BreezeWoood'},
  {id: 4, name: 'InsideDecorShop'},
  {id: 5, name: 'JoyceArtSpace'},
];

const Wrapper = styled.div`
  width: 45%;
`;

const Title = styled.h1`
  text-align: center;
`;
const Label = styled.label`
  margin-bottom: 0.5rem;
  font-weight: bold;
  font-size: 1.2rem;
`;
const Input = styled.input`
  height: 30%;
  width: 30vw;
  border-radius: 8px;
  padding: 0.2rem;
  font-size: 1rem;
`;
const FormItem = styled.div`
  height: 12vh;
  display: flex;
  flex-direction: column;
  width: 50%;
  margin-left: 1rem;

  width: 30vw;
`;
const Form = styled.form`
  padding-top: 1rem;
`;

const Select = styled.select`
  width: 30vw;
  height: 35%;
  border-radius: 8px;
  font-size: 1rem;
`;
const Option = styled.option``;

const TextArea = styled.textarea`
  width: 30vw;
  height: 80vh;
  border-radius: 8px;
  font-size: 1rem;
`;

const SaveBtn = styled.button`
  margin-left: 1rem;
  margin-top: 1rem;

  background-color: cornflowerblue;
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 1rem;

  padding: 1rem;
`;

const Progress = styled.div`
  background-color: #aaa;
  border: 1px solid transparent;
  border-radius: 10px;

  margin-bottom: 5px;
`;
const ProgressBar = styled.div`
  background-color: #007bff;
  border: 1px solid transparent;
  border-radius: 10px;
  color: #fff;

  font-size: 1rem;
`;

const ProgressCard = styled.div`
  height: ${props => (props.uploadProgress !== 0 ? '15vh' : '8vh')};

  margin-left: 1rem;
  margin-top: -12px;
`;

const initialState = {
  name: '',
  imageURL: '',
  price: 0,
  category: '',
  brand: '',
  desc: '',
};

const AddProduct = () => {
  const {id} = useParams();
  const detectForm = (id, f1, f2) => {
    if (id === 'ADD') {
      return f1;
    }
    return f2;
  };
  const products = useSelector(selectProducts);
  const productEdit = products.find(product => product.id === id);
  const [product, setProduct] = useState(
    detectForm(id, {...initialState}, productEdit)
  );

  const [uploadProgress, setUploadProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = e => {
    const {name, value} = e.target;
    setProduct({...product, [name]: value});
  };
  const handleImageChange = e => {
    const file = e.target.files[0];
    const storageRef = ref(storage, `images/${Date.now()}${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      'state_changed',
      snapshot => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress);
      },
      error => {
        toast.error(error.message);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(downloadURL => {
          setProduct({...product, imageURL: downloadURL});
          toast.success('Image uploaded successfully');
        });
      }
    );
  };

  const addProduct = e => {
    e.preventDefault();

    setIsLoading(true);
    try {
      const docRef = addDoc(collection(db, 'products'), {
        name: product.name,
        imageURL: product.imageURL,
        price: Number(product.price),
        category: product.category,
        brand: product.brand,
        desc: product.desc,
        createdAt: Timestamp.now().toDate(),
      });
      setUploadProgress(0);
      setProduct({
        ...initialState,
      });

      toast.success('Product uploaded successfully.');
      navigate('/admin/all-products');
    } catch (error) {
      toast.error(error.message);
    }
    setIsLoading(false);
  };

  const editProduct = e => {
    e.preventDefault();

    setIsLoading(true);

    if (product.imageURL !== productEdit.imageURL) {
      const storageRef = ref(storage, productEdit.imageURL);
      deleteObject(storageRef);
    }

    try {
      setDoc(doc(db, 'products', id), {
        name: product.name,
        imageURL: product.imageURL,
        price: Number(product.price),
        category: product.category,
        brand: product.brand,
        desc: product.desc,
        createdAt: productEdit.createdAt,
        editedAt: Timestamp.now().toDate(),
      });
      toast.success('Product edited successfully');
      navigate('/admin/all-products');
    } catch (error) {
      toast.error(error.message);
    }
    setIsLoading(false);
  };

  return (
    <>
      {/* {isLoading && <Loader />} */}
      <Wrapper>
        <Title>{detectForm(id, 'Add New Product', 'Edit Product')}</Title>
        <Card>
          <Form onSubmit={detectForm(id, addProduct, editProduct)}>
            <FormItem>
              <Label>Product Name:</Label>
              <Input
                type="text"
                placeholder="Product name"
                required
                name="name"
                value={product.name}
                onChange={handleInputChange}
              />
            </FormItem>{' '}
            <ProgressCard uploadProgress={uploadProgress}>
              <Label>Product Image:</Label>
              {uploadProgress === 0 ? null : (
                <Progress>
                  <ProgressBar style={{width: `${uploadProgress}%`}}>
                    {uploadProgress < 100
                      ? `Uploading ${uploadProgress}%`
                      : `Upload Complete ${uploadProgress}%`}
                  </ProgressBar>
                </Progress>
              )}

              <Input
                type="file"
                accept="image/*"
                placeholder="Product Image"
                name="image"
                onChange={handleImageChange}
              />

              {product.imageURL === '' ? null : (
                <Input
                  type="text"
                  // required
                  placeholder="Image URL"
                  name="imageURL"
                  disabled
                  value={product.imageURL}
                  style={{marginTop: '-10px'}}
                />
              )}
            </ProgressCard>
            <FormItem>
              <Label>Product Price:</Label>
              <Input
                type="number"
                placeholder="Product price"
                required
                name="price"
                value={product.price}
                onChange={handleInputChange}
              />
            </FormItem>{' '}
            <FormItem>
              <Label>Product Category:</Label>
              <Select
                required
                name="category"
                value={product.category}
                onChange={handleInputChange}
              >
                <Option value="" disabled>
                  --choose product category--
                </Option>
                {categories.map(category => {
                  return (
                    <Option key={category.id} value={category.name}>
                      {category.name}
                    </Option>
                  );
                })}
              </Select>
            </FormItem>{' '}
            <FormItem>
              <Label>Product Company/Brand:</Label>
              <Select
                required
                name="brand"
                value={product.brand}
                onChange={handleInputChange}
              >
                <Option value="" disabled>
                  --choose product brand--
                </Option>
                {brands.map(brand => {
                  return (
                    <Option key={brand.id} value={brand.name}>
                      {brand.name}
                    </Option>
                  );
                })}
              </Select>
            </FormItem>{' '}
            <FormItem>
              <Label>Product Description:</Label>
              <TextArea
                name="desc"
                value={product.desc}
                required
                onChange={handleInputChange}
              ></TextArea>
            </FormItem>{' '}
            <SaveBtn type="submit">
              {detectForm(id, 'Save Product', 'Edit Product')}
            </SaveBtn>
          </Form>
        </Card>
      </Wrapper>
    </>
  );
};

export default AddProduct;
