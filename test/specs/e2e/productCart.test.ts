import { FileUtil } from '../../../utilities/file/fileUtil';
import { LoggerHelper } from '../../../utilities/reporting/loggerHelper';
import { ProductDetails } from '../../resources/customTypes/productDetails';
import { HomeScreen } from '../../screens/homeScreen';
import { MyCartScreen } from '../../screens/myCartScreen';
import { ProductScreen } from '../../screens/productScreen';
import * as productDetailsJson from './../../resources/testdata/productDetails.json';

let homeScreen: HomeScreen;
let productScreen: ProductScreen;
let myCartScreen: MyCartScreen;

const specName: string = 'Product cart scenarios'
describe(specName, () => {
    before(async () => {
        LoggerHelper.setupLogger(specName);
        homeScreen = new HomeScreen();
        productScreen = new ProductScreen();
        myCartScreen = new MyCartScreen();
    });

    it('Should add multiple products to cart with quantity more than one', async () => {
        const product1: ProductDetails = FileUtil.convertJsonToCustomType(productDetailsJson);
        product1.color = 'BLACK';
        product1.quantity = 3;

        const product2: ProductDetails = {
            name: 'Sauce Labs Onesie',
            price: 7.99,
            color: 'RED'
        }
        product2.quantity = 2;

        await homeScreen.clickOnProduct(product1.name);
        await productScreen.validateProductScreen(product1);
        await productScreen.selectColor(product1.color);
        await productScreen.addProductToCart(product1.quantity);
        await driver.back();
        await homeScreen.clickOnProduct(product2.name);
        await productScreen.validateProductScreen(product2);
        await productScreen.selectColor(product2.color);
        await productScreen.addProductToCart(product2.quantity);
        await homeScreen.clickCartIcon();
        await myCartScreen.validateMyCartScreen([product1, product2]);
        await homeScreen.clickCartIcon();
        await myCartScreen.emptyCart();
        await myCartScreen.validateEmptyCartScreen();
    });

    it.skip('Should be able to empty cart', async () => {
        const product: ProductDetails = FileUtil.convertJsonToCustomType(productDetailsJson);

        await homeScreen.clickOnProduct(product.name);
        await productScreen.validateProductScreen(product);
        await productScreen.addProductToCart();
        await homeScreen.clickCartIcon();
        await myCartScreen.emptyCart();
        await myCartScreen.validateEmptyCartScreen();
    });
});