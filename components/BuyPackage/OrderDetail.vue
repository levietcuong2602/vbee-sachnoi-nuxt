<template>
    <div id="payment" v-bind:class="['components-container','components-container-mb']">
        <div class="content-package" style="width: 100%">
            <div class="el-col-lg-16 el-col-md-16 el-col-sm-24 el-col-xs-24 box-cart-info-left">
                <h3>Thanh toán đơn hàng</h3>
                <div class="box-step-1">
                    <div class="cart-info">
                        <div class="box-title-cart-info">
                            <div :class="titleCartInfoClass">
                                <h2>1</h2><b>Thông tin giỏ hàng </b>
                            </div>
                            <svg width="250" height="50" viewBox="0 0 250 50" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd"
                                      d="M0 0H223.813L236.907 12.5L250 25L223.211 50L0 50V0Z" :fill="fillSvgBuy"/>
                            </svg>
                        </div>
                        <div class="box-change-cart-info">
                            <p class="box-change-p hidden-xs-only">Quý khách vui lòng chọn gói dịch vụ</p>
                            <p class="text-change" v-show="stepCurrent !== 0" @click="onGotoStep(0)"><i>Thay đổi</i></p>
                        </div>
                    </div>
                    <div class="content-step content-step-1" v-show="stepCurrent === 0">
                        <table class="table table-bordered info-detail">
                            <tr>
                                <td>
                                    <span>Gói dịch vụ</span>
                                </td>
                                <td>
                                    <span>Số lượng</span>
                                </td>
                                <td>Chi phí (VNĐ)</td>
                            </tr>
                            <tr>
                                <td class="select-font-bold">
                                    <el-select v-model="packageDetail" placeholder="Gói dịch vụ">
                                        <el-option
                                                v-for="item in arrayPackages"
                                                :key="item.value"
                                                :label="item.label"
                                                :value="item">
                                        </el-option>
                                    </el-select>
                                </td>
                                <td class="select-font-bold">
                                    <el-select v-model="numberDetail" placeholder="Số gói">
                                        <el-option
                                                v-for="item in numberPackage"
                                                :key="item.value"
                                                :label="item.label"
                                                :value="item">
                                        </el-option>
                                    </el-select>
                                </td>
                                <td><b style="font-size: 18px">{{formatNumber(stepone.price)}}</b></td>
                            </tr>
                        </table>
                        <div class="proceed-payment">
                            <el-button :class="btnProceedPaymentClass" @click="gotoStepOne" round>Tiến hành thanh toán
                                <svg width="12" height="18" viewBox="0 0 12 18" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <g clip-path="url(#clip0)">
                                        <path d="M6.43366 9.34392L11.8203 3.95732C12.0599 3.71762 12.0599 3.32915 11.8203 3.08958L11.3865 2.65572C11.1468 2.41619 10.7582 2.41619 10.5188 2.65572L5.99993 7.17444L1.48165 2.65572C1.24184 2.41619 0.852978 2.41619 0.613678 2.65572L0.179828 3.08957C-0.0599804 3.32915 -0.0599804 3.71762 0.179828 3.95731L5.56655 9.34392C5.80601 9.58369 6.19413 9.58369 6.43366 9.34392Z"
                                              :fill="fillSvgAct"/>
                                    </g>
                                    <g clip-path="url(#clip1)">
                                        <path d="M6.43366 15.3439L11.8203 9.95732C12.0599 9.71762 12.0599 9.32915 11.8203 9.08958L11.3865 8.65572C11.1468 8.41619 10.7582 8.41619 10.5188 8.65572L5.99993 13.1744L1.48165 8.65572C1.24184 8.41619 0.852978 8.41619 0.613678 8.65572L0.179828 9.08957C-0.0599804 9.32915 -0.0599804 9.71762 0.179828 9.95731L5.56655 15.3439C5.80601 15.5837 6.19413 15.5837 6.43366 15.3439Z"
                                              :fill="fillSvgAct"/>
                                    </g>
                                    <defs>
                                        <clipPath id="clip0">
                                            <rect width="12" height="12" fill="white"
                                                  transform="translate(12) rotate(90)"/>
                                        </clipPath>
                                        <clipPath id="clip1">
                                            <rect width="12" height="12" fill="white"
                                                  transform="translate(12 6) rotate(90)"/>
                                        </clipPath>
                                    </defs>
                                </svg>
                            </el-button>
                        </div>
                    </div>
                </div>
                <div class="box-step-2">
                    <div class="cart-info">
                        <div class="box-title-cart-info">
                            <div :class="titleCartInfoClass">
                                <h2>2</h2><b>Thông tin khách hàng</b>
                            </div>
                            <svg width="250" height="50" viewBox="0 0 250 50" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd"
                                      d="M0 0H223.813L236.907 12.5L250 25L223.211 50L0 50V0Z" :fill="fillSvgBuy"/>
                            </svg>
                        </div>
                        <div class="box-change-cart-info">
                            <p class="box-change-p hidden-xs-only">Quý khách vui lòng cung cấp thông tin khách hàng</p>
                            <p class="text-change" v-show="stepCurrent !== 1" @click="onGotoStep(1)"><i>Thay đổi</i></p>
                        </div>

                    </div>
                    <div class="content-step content-step-2" v-show="stepCurrent === 1">
                        <div class="row info-customer">
                            <div class="title col-sm-3 col-5"><p>Họ tên</p></div>
                            <div class="col-sm-9 col-7 input-info-customer ">
                                <input class="form-control" v-model="orders.full_name"/>
                            </div>
                        </div>
                        <div class="row info-customer">
                            <div class="title col-sm-3 col-5"><p>Điện thoại <span style="color: #FF0000">(*)</span></p>
                            </div>
                            <div class="col-sm-9 col-7 input-info-customer">
                                <input class="form-control" v-model="orders.phone_number" @keyup="handleCheckInputPhone" placeholder="Số điện thoại"/>
                                <p class="has-danger" v-show="error_phone">{{text_error_phone}}</p>
                            </div>
                        </div>
                        <div class="row info-customer">
                            <div class="title col-sm-3 col-5"><p>Email <span style="color: #FF0000">(*)</span></p></div>
                            <div class="col-sm-9 col-7 input-info-customer">
                                <input class="form-control" @keyup="handleCheckInputMail()" v-model="orders.email"/>
                                <p class="has-danger" v-show="error_mail">{{text_error_email}}</p>
                            </div>
                        </div>
                        <div class="row info-customer">
                            <div class="title col-sm-3 col-5"><p>Tỉnh thành</p></div>
                            <div class="col-sm-9 col-7 input-info-customer">
                                <el-select v-model="stepone.citySelect" placeholder="Select">
                                    <el-option :value="null">--Chọn thành phố--</el-option>
                                    <el-option
                                            v-for="item in listCitys"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item">
                                    </el-option>
                                </el-select>
                            </div>
                        </div>
                        <div class="row info-customer">
                            <div class="title col-sm-3 col-5"><p>Ghi chú bổ sung</p></div>
                            <div class="col-sm-9 col-7 input-info-customer">
                                <textarea v-model="orders.content" class="form-control"> </textarea>
                            </div>
                        </div>
                        <div class="row info-customer" style="display: flex; justify-content: flex-end; align-items: center">
                            <div class="col-sm-9 col-xs-12 input-info-customer">
                                <el-switch v-model="orders.is_company" @click="orders.is_company = !orders.is_company"></el-switch>
                                <label style="margin-bottom: 0">Xuất hóa đơn công ty</label>
                            </div>
                        </div>
                        <div v-show="orders.is_company">
                            <div class="row info-customer">
                                <div class="title col-sm-3 col-xs-12"><p>Tên công ty <span style="color: #FF0000">(*)</span></p></div>
                                <div class="col-sm-9 col-xs-12 input-info-customer">
                                    <input v-model="orders.company_name" type="text" class="form-control" @keyup="handleCheckInputNameCompany">
                                    <p class="has-danger" v-show="error_nameCompany">{{text_error_nameCompany}}</p>
                                </div>
                            </div>
                            <div class="row info-customer">
                                <div class="title col-sm-3 col-xs-12"><p>Địa chỉ công ty <span style="color: #FF0000">(*)</span></p></div>
                                <div class="col-sm-9 col-xs-12 input-info-customer">
                                    <input v-model="orders.company_address" type="text" class="form-control" @keyup="handleCheckInputAdrCompany">
                                    <p class="has-danger" v-show="error_addCompany">{{text_error_addCompany}}</p>
                                </div>
                            </div>
                            <div class="row info-customer">
                                <div class="title col-sm-3 col-xs-12"><p>Mã số thuế <span style="color: #FF0000">(*)</span></p></div>
                                <div class="col-sm-9 col-xs-12 input-info-customer">
                                    <input v-model="orders.company_tax" type="text" class="form-control" @keyup="handleCheckInputTaxCode">
                                    <p class="has-danger" v-show="error_taxCode">{{text_error_taxCode}}</p>
                                </div>
                            </div>
                        </div>
                        <div class="proceed-payment">
                            <el-button :class="btnProceedPaymentClass" @click="gotoStepTwo" round>Tiến hành thanh toán
                                <svg width="12" height="18" viewBox="0 0 12 18" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <g clip-path="url(#clip0)">
                                        <path d="M6.43366 9.34392L11.8203 3.95732C12.0599 3.71762 12.0599 3.32915 11.8203 3.08958L11.3865 2.65572C11.1468 2.41619 10.7582 2.41619 10.5188 2.65572L5.99993 7.17444L1.48165 2.65572C1.24184 2.41619 0.852978 2.41619 0.613678 2.65572L0.179828 3.08957C-0.0599804 3.32915 -0.0599804 3.71762 0.179828 3.95731L5.56655 9.34392C5.80601 9.58369 6.19413 9.58369 6.43366 9.34392Z"
                                              :fill="fillSvgAct"/>
                                    </g>
                                    <g clip-path="url(#clip1)">
                                        <path d="M6.43366 15.3439L11.8203 9.95732C12.0599 9.71762 12.0599 9.32915 11.8203 9.08958L11.3865 8.65572C11.1468 8.41619 10.7582 8.41619 10.5188 8.65572L5.99993 13.1744L1.48165 8.65572C1.24184 8.41619 0.852978 8.41619 0.613678 8.65572L0.179828 9.08957C-0.0599804 9.32915 -0.0599804 9.71762 0.179828 9.95731L5.56655 15.3439C5.80601 15.5837 6.19413 15.5837 6.43366 15.3439Z"
                                              :fill="fillSvgAct"/>
                                    </g>
                                    <defs>
                                        <clipPath id="clip0">
                                            <rect width="12" height="12" fill="white"
                                                  transform="translate(12) rotate(90)"/>
                                        </clipPath>
                                        <clipPath id="clip1">
                                            <rect width="12" height="12" fill="white"
                                                  transform="translate(12 6) rotate(90)"/>
                                        </clipPath>
                                    </defs>
                                </svg>
                            </el-button>
                        </div>
                    </div>
                </div>
                <div class="box-step-3">
                    <div class="cart-info">
                        <div class="box-title-cart-info">
                            <div :class="titleCartInfoClass">
                                <h2>3</h2><b>Thanh toán đơn hàng</b>
                            </div>
                            <svg width="250" height="50" viewBox="0 0 250 50" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd"
                                      d="M0 0H223.813L236.907 12.5L250 25L223.211 50L0 50V0Z" :fill="fillSvgBuy"/>
                            </svg>
                        </div>
                        <div class="box-change-cart-info">
                            <p class="box-change-p hidden-xs-only">Vui lòng chọn hình thức thanh toán phù hợp</p>
                        </div>

                    </div>

                    <div class="content-step content-step-3" v-show="stepCurrent === 2">
                        <el-tabs tab-position="left" v-model="activeName">
                            <div class="proceed-payment">
                                <el-button @click="onSave" :class="btnProceedPaymentClass" round>Xác nhận đơn hàng
                                    <svg width="14" height="12" viewBox="0 0 14 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M6.86785 5.56634L1.48124 0.179651C1.24155 -0.0598835 0.853074 -0.0598835 0.613501 0.179651L0.179651 0.613501C-0.0598836 0.853191 -0.0598836 1.24178 0.179651 1.48116L4.69836 6.00007L0.17965 10.5183C-0.0598841 10.7582 -0.0598842 11.147 0.17965 11.3863L0.6135 11.8202C0.853074 12.06 1.24155 12.06 1.48124 11.8202L6.86785 6.43345C7.10762 6.19399 7.10762 5.80587 6.86785 5.56634Z" :fill="fillSvgAct"/>
                                        <path d="M12.8678 5.56634L7.48124 0.179651C7.24155 -0.0598835 6.85307 -0.0598835 6.6135 0.179651L6.17965 0.613501C5.94012 0.853191 5.94012 1.24178 6.17965 1.48116L10.6984 6.00007L6.17965 10.5183C5.94012 10.7582 5.94012 11.147 6.17965 11.3863L6.6135 11.8202C6.85307 12.06 7.24155 12.06 7.48124 11.8202L12.8678 6.43345C13.1076 6.19399 13.1076 5.80587 12.8678 5.56634Z" :fill="fillSvgAct"/>
                                    </svg>
                                </el-button>
                            </div>
                            <el-tab-pane v-for="(item, i) in listPaymentMethod" :name="item.active_name" :key="i">
                                <div class="left-tab-panel" slot="label" @click="orders.method_payment = item.id">
                                    <img class="img-tab-panel" :src="item.icon" alt="">
                                    <div class="custom-hide">
                                        <div v-html="item.name"></div>
                                    </div>
                                </div>
                                <div class="more-info-head col-12">
                                    <p>{{item.description}}</p>
                                </div>
                                <div class="accept_order col-12">
                                    <AcceptOder :data="overView"></AcceptOder>
                                </div>
                                <div v-show="item.is_bank === 1" class="box-select-banks col-12">
                                    <ListBank :banks="listBanks" :bank_id.sync="orders.bank_id" />
                                </div>
                                <div class="info-banks-transfer col-12">
                                    <div v-html="item.content"></div>
                                    <p><span style="font-weight: bold">Nội dung chuyển khoản:</span> {{orders.trad_code}}</p>
                                </div>

                            </el-tab-pane>
                        </el-tabs>
                    </div>
                </div>
            </div>
            <div class="el-col-lg-7 el-col-md-7 el-col-sm-24 el-col-xs-24 box-cart-info-right">
                <h3>Đơn hàng của quý khách</h3>
                <div class="buy-fee">
<!--                    <div class="buy-fee-line d-none">-->
<!--                        <p>Phí cài đặt 1 lần:</p>-->
<!--                        <p><b>{{formatNumber(stepone.fee_setup)}} VNĐ</b></p>-->
<!--                    </div>-->
                    <div class="buy-fee-line">
                        <p>Phí hàng tháng:</p>
                        <p><b>{{formatNumber(stepone.price)}} VNĐ</b></p>
                    </div>
                    <div class="buy-fee-line">
                        <p>Tên gói:</p>
                        <p><b>{{(packageDetail.label)}}</b></p>
                    </div>
<!--                    <div class="buy-fee-line">-->
<!--                        <p>Thuế VAT</p>-->
<!--                        <p><b>{{formatNumber(stepone.vat)}} VNĐ</b></p>-->
<!--                    </div>-->
                    <div class="buy-fee-line">
                        <p>Số lượng:</p>
                        <p><b>{{parseInt(numberDetail.value)}} Gói</b></p>
                    </div>
                    <hr>
                    <div class="buy-fee-line">
                        <p>Thành tiền</p>
                        <p><b style="font-size: 28px;" class="money-fee-mb">{{formatNumber(stepone.total_price)}}
                            VNĐ</b></p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { setStringPackage, formatNumber, setTradCode } from '@/utils/convert';
import ListBank from './ListBank';
import AcceptOder from './AcceptOder';
import numberPackage from '@/data/number.json';
import Cities from '@/data/cities.json';
import { Message } from 'element-ui';
import { changeToSlug } from '@/utils/convert';
import { isPhoneNumberValid, isEmailValid, isTaxCodeValid } from '@/utils/validate';
import { getListBanksApi } from '@/api/bank';

export default {
  name: 'Payment',
  components: { AcceptOder, ListBank },
  data: function () {
    return {
      error_nameCompany: false,
      error_addCompany: false,
      error_taxCode: false,
      error_mail: false,
      text_error_email: '',
      text_error_phone: '',
      text_error_nameCompany: '',
      text_error_addCompany: '',
      text_error_taxCode: '',
      error_phone: false,
      listPaymentMethod: [],
      listBanks: [],
      activeName: 'zero',
      listPackage: [],
      numberPackage: [],
      listCitys: [],
      list_banks: [],
      is_loading: true,
      stepCurrent: 0,
      packageDetail: {
        lable: 'Mời chọn gói',
        value: 0,
        fee_setup: 0,
        price_sale: 0,
        number_month: 0,
        expire_day: 0,
      },
      arrayPackages: [],
      numberDetail: {
        lable: 'Chọn số gói',
        value: 0,
      },
      stepone: {
        fee_setup: 0,
        tmp_price: 0,
        vat: 0,
        price: 0,
        total_price: 0,
        citySelect: {},
      },
      orders: {
        city: '',
        full_name: '',
        phone_number: '',
        email: '',
        content: '',
        company_name: '',
        company_tax: '',
        company_address: '',
        method_payment: 0,
        trad_code: '',
        bank_id: 1,
        is_company: false,
      },
      overView: {},
      fillSvgBuy: '',
      fillSvgAct: '',
      titleCartInfoClass: ['title-cart-info'],
      btnProceedPaymentClass: ['btn-proceed-payment'],
      is_vbee: this.$store.getters.is_vbee,
    };
  },
  watch: {
    packageDetail(value) {
      this.stepone.fee_setup = (this.numberDetail.value < 6) ? value.fee_setup : 0;
      this.handleCalculatorPrice();
      this.handleRenderCode();
      this.handleSetOverView();
    },
    numberDetail(value) {
      this.stepone.fee_setup = (value.value < 6) ? this.packageDetail.fee_setup : 0;
      this.handleCalculatorPrice();
      this.handleRenderCode();
      this.handleSetOverView();
    },
    listPackage(value) {
      console.log(value);
      if (value.length > 0) {
        const arrays = [];
        value.map(item => {
          arrays.push({ ...{ label: setStringPackage(item.name), value: item.id, fee_setup: item.fee_setup, price_sale: item.price_sale, number_month: this.numberDetail.value, expire_day: item.expire_day }});
        });
        this.arrayPackages = arrays;
        console.log(this.arrayPackages);
      }
    },
  },
  methods: {
    setStringPackage,
    handleCheckInputPhone() {
      console.log(this.orders.phone_number);
      if (this.orders.phone_number === '') {
        this.error_phone = true;
        this.text_error_phone = 'Vui lòng nhập số điện thoại';
      } else if (!isPhoneNumberValid(this.orders.phone_number)) {
        this.error_phone = true;
        this.text_error_phone = 'Số điện thoại không đúng định dạng!';
      } else {
        this.error_phone = false;
        this.text_error_phone = '';
      }
    },
    handleCheckInputMail() {
      if (this.orders.email === '') {
        this.error_mail = true;
        this.text_error_email = 'Vui lòng nhập địa chỉ Email';
      } else if (!isEmailValid(this.orders.email)) {
        this.error_mail = true;
        this.text_error_email = 'Email không đúng định dạng!';
      } else {
        this.error_mail = false;
        this.text_error_email = '';
      }
    },
    handleCheckInputNameCompany() {
      if (this.orders.company_name === '') {
        this.error_nameCompany = true;
        this.text_error_nameCompany = 'Vui lòng nhập tên công ty';
      } else {
        this.error_nameCompany = false;
        this.text_error_nameCompany = '';
      }
    },
    handleCheckInputAdrCompany() {
      if (this.orders.company_address === '') {
        this.error_addCompany = true;
        this.text_error_addCompany = 'Vui lòng nhập địa chỉ công ty';
      } else {
        this.error_addCompany = false;
        this.text_error_addCompany = '';
      }
    },
    handleCheckInputTaxCode() {
      if (this.orders.company_tax === '') {
        this.error_taxCode = true;
        this.text_error_taxCodel = 'Vui lòng nhập mã số thuế';
      } else if ((this.orders.company_tax.length === 10 || this.orders.company_tax.length === 13) && isTaxCodeValid(this.orders.company_tax)) {
        this.error_taxCode = false;
        this.text_error_taxCode = '';
      } else {
        this.error_taxCode = true;
        this.text_error_taxCode = 'Mã thuế không đúng định dạng!';
      }
    },

    createInit() {
      const orderId = this.$route.params && this.$route.params.id;
      this.$store.dispatch('getOrderDetail', orderId).then(() => {
        this.orders = { ...this.$store.getters.order_detail_data };
        this.packageDetail = { label: setStringPackage(this.orders.package.name), value: this.orders.id_package, fee_setup: this.orders.fee_setup, price_sale: this.orders.package.price_sale, number_month: this.orders.number_month };
        const array = this.numberPackage.filter(obj => {
          return obj.value === this.orders.number_month;
        });
        this.numberDetail = array[0];
        this.activeName = this.orders.method.active_name;
        this.stepCurrent = 2;
        if (this.orders.is_company === 1) {
          this.orders.is_company = true;
        } else {
          this.orders.is_company = false;
        }
        this.listCitys.map(item => {
          if (item.value === this.orders.city) {
            this.stepone.citySelect = { label: item.label, value: item.value };
          }
        });
      });
    },
    gotoStepOne() {
      if (this.handleCheckEmptyPackage()) {
        return;
      }
      this.stepCurrent = 1;
    },
    gotoStepTwo() {
      if (this.handleCheckPhoneAndEmail()) {
        return;
      }
      this.stepCurrent = 2;
    },
    onSave() {
      this.loading = true;
      const params = { ...this.orders };
      params.id_package = this.packageDetail.value;
      params.total_price = this.stepone.total_price;
      params.number_month = this.numberDetail.value;
      params.is_company = (this.orders.is_company) ? 1 : 0;
      params.fee_setup = this.packageDetail.fee_setup;
      params.bank_id = this.$store.getters.bankId;
      params.city = this.stepone.citySelect.value;
      console.log(params);
      this.$store.dispatch('updateData', params).then(response => {
        this.loading = false;
        if (response.data.length !== 0) {
          window.location.href = response.data.url;
        } else {
          this.$router.push('/profile/lich-su-thanh-toan');
        }
      }).catch(() => {
        this.loading = false;
      });
    },
    onGotoStep(number) {
      if (this.handleCheckEmptyPackage() && number === 1) {
        return;
      }
      this.stepCurrent = number;
    },
    handleRenderCode() {
      this.orders.trad_code = setTradCode(changeToSlug(this.packageDetail.label), this.numberDetail.value, this.orders.phone_number);
    },
    handleCheckEmptyPackage() {
      if (this.packageDetail.value === 0) {
        Message.error('Vui lòng chọn gói dịch vụ');
        return true;
      }
    },
    handleCheckPhoneAndEmail() {
      if (this.orders.phone_number === '' || this.orders.phone_number === null) {
        // Message.error('Vui lòng nhập số điện thoại');
        return true;
      }
      if (!isPhoneNumberValid(this.orders.phone_number)) {
        // Message.error('Số điện thoại không đúng định dạng!');
        return true;
      }
      if (this.orders.email === '' || this.orders.email === null) {
        // Message.error('Vui lòng nhập nhập email');
        return true;
      }
      if (this.orders.is_company === true) {
        if (this.orders.company_name === '' || this.orders.company_name === null) {
          // Message.error('Vui lòng nhập nhập tên công ty');
          return true;
        }
        if (this.orders.company_address === '' || this.orders.company_address === null) {
          // Message.error('Vui lòng nhập nhập địa chỉ công ty');
          return true;
        }
        if (this.orders.company_tax === '' || this.orders.company_tax === null) {
          // Message.error('Vui lòng nhập nhập mã số thuế');
          return true;
        }
        if (!isTaxCodeValid(this.orders.company_tax)) {
          // Message.error('Email không đúng định dạng!');
          return true;
        }
      }

      if (!isEmailValid(this.orders.email)) {
        // Message.error('Email không đúng định dạng!');
        return true;
      }
      return false;
    },
    formatNumber,
    handleSetNumberPackage() {
      this.numberPackage = numberPackage;
    },
    // handelSetPackage() {
    //   if (this.$store.getters.packages.length === 0) {
    //     this.$store.dispatch('getListPackages', this.listQuery).then(() => {
    //       this.listPackage = this.$store.getters.packages;
    //     });
    //   } else {
    //     this.listPackage = this.$store.getters.packages;
    //   }
    // },
    handelSetPackage() {
      const user = this.$store.getters.userInfor;
      this.is_enterprise = user.is_enterprise;
      if (this.$store.getters.packages.length === 0) {
        this.$store.dispatch('getListPackages', { is_enterprise: 0 }).then(() => {
          this.listPackage = this.$store.getters.packages;
        });
      } else {
        this.listPackage = this.$store.getters.packages;
      }
    },
    handleCalculatorPrice () {
      this.stepone.price = parseInt(this.packageDetail.price_sale) * parseInt(this.numberDetail.value);
      this.stepone.tmp_price = this.stepone.price + parseInt(this.stepone.fee_setup);
      // this.stepone.vat = this.stepone.tmp_price * (0.1);
      // this.stepone.total_price = this.stepone.tmp_price + this.stepone.vat;
      this.stepone.total_price = this.stepone.tmp_price;
    },
    handleSetUserInfo() {
      const user = this.$store.getters.userInfor;
      this.orders.email = user.email;
      this.orders.phone_number = user.phone;
    },
    handleSetListCity() {
      const arrayCities = [];
      Cities.map(item => {
        arrayCities.push({ ...{ label: item.name, value: item.code }});
      });
      this.listCitys = arrayCities;
    },
    handleSetOverView() {
      const data = {
        tradding_code: this.orders.trad_code,
        name_package: this.packageDetail.label,
        total_price: this.stepone.total_price,
        expire_day: this.packageDetail.expire_day,
      };
      this.overView = { ...data };
    },
    onGetMethodPayment() {
      this.$store.dispatch('getMothodPayment').then((responsive) => {
        if (responsive.status_code === 0) {
          this.listPaymentMethod = responsive.data;
        }
      });
    },
    onGetBanks() {
      getListBanksApi().then(responsive => {
        if (responsive.status_code === 0) {
          this.listBanks = responsive.data;
        }
      });
    },
    checkMobi() {
      this.titleCartInfoClass = ['title-cart-info', 'title-cart-info-mb'];
      // this.fillSvgBuy = '#0061AF';
      this.btnProceedPaymentClass = ['btn-proceed-payment', 'btn-proceed-payment-mb'];
      // this.fillSvgAct = '#ffffff';
      if (this.is_vbee) {
        this.fillSvgBuy = '#FFC000';
        this.fillSvgAct = '#000000';
      } else {
        this.fillSvgBuy = '#0061AF';
        this.fillSvgAct = '#ffffff';
      }
    },
  },
  created() {
    this.checkMobi();
    this.createInit();
    this.handleSetNumberPackage();
    this.handelSetPackage();
    this.handleSetUserInfo();
    this.handleSetListCity();
    this.onGetMethodPayment();
    this.onGetBanks();
  },
};
</script>

<style scoped lang="scss">
    @import 'node_modules/bootstrap/scss/bootstrap';
    @import 'node_modules/bootstrap-vue/src/index.scss';
    @import "styles/payment";
</style>
