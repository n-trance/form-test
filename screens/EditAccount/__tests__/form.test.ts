import * as yup from "yup";
import { schema } from "../form";

describe("First Name Tests", () => {
  it("must be string", async () => {
    const testNumber = await yup.reach(schema, "firstName").isValid(123);
    expect(testNumber).toBe(false);
    const testString = await yup.reach(schema, "firstName").isValid("Hello");
    expect(testString).toBe(true);
  });

  it("must only use characters a-z A-Z", async () => {
    const hasNumbers = await yup.reach(schema, "firstName").isValid("123Hello");
    expect(hasNumbers).toBe(false);
    const testString = await yup.reach(schema, "firstName").isValid("Hello");
    expect(testString).toBe(true);
  });

  it("must have minimum 1 character", async () => {
    const lessThanOne = await yup.reach(schema, "firstName").isValid("");
    expect(lessThanOne).toBe(false);
    const moreThanOne = await yup.reach(schema, "firstName").isValid("H");
    expect(moreThanOne).toBe(true);
  });

  it("must have maximum 50 characters", async () => {
    const moreThan50 = await yup
      .reach(schema, "firstName")
      .isValid("qwertyuiopasdfghjklzxcvbnmqwertyuiopasdfghjklzxcvbnm");
    expect(moreThan50).toBe(false);
    const exactly50 = await yup
      .reach(schema, "firstName")
      .isValid("qwertyuiopasdfghjklzxcvbnmqwertyuiopasdfghjklzxcvb");
    expect(exactly50).toBe(true);
  });
});

describe("Email tests", () => {
  it("valid email <string>@<domain>", async () => {
    const domain = await yup
      .reach(schema, "email")
      .isValid("example-example.com");
    expect(domain).toBe(false);
    const multipleAmp = await yup
      .reach(schema, "email")
      .isValid("example@example@1.com");
    expect(multipleAmp).toBe(false);
    const regularEmail = await yup
      .reach(schema, "email")
      .isValid("example@example.com");
    expect(regularEmail).toBe(true);
  });

  it("maximum 254 characters", async () => {
    const over254char = await yup
      .reach(schema, "email")
      .isValid(
        "1234567890@12345678912345678912345678912345678912345678912345678912345678912345678912345678912345678912345678912345678912345678912345678912345678912345678912345678912345678912345678912345678912345678912345678912345678912345678912345678912345678912345678.com"
      );
    expect(over254char).toBe(false);
    const exactly254char = await yup
      .reach(schema, "email")
      .isValid(
        "1234567890@12345678912345678912345678912345678912345678912345678912345678912345678912345678912345678912345678912345678912345678912345678912345678912345678912345678912345678912345678912345678912345678912345678912345678912345678912345678912345678912345.com"
      );
    expect(exactly254char).toBe(true);
  });
});

describe("Phone Tests", () => {
  it("Invalid AU numbers", async () => {
    const example1 = await yup.reach(schema, "phone").isValid("9999999999");
    expect(example1).toBe(false);
    const example2 = await yup.reach(schema, "phone").isValid("02345678");
    expect(example2).toBe(false);
    const example3 = await yup.reach(schema, "phone").isValid("123456789012");
    expect(example3).toBe(false);
  });

  it("Valid AU numbers", async () => {
    const example1 = await yup.reach(schema, "phone").isValid("+61412341234");
    expect(example1).toBe(true);
    const example2 = await yup.reach(schema, "phone").isValid("0212341234");
    expect(example2).toBe(true);
    const example3 = await yup.reach(schema, "phone").isValid("0312341234");
    expect(example3).toBe(true);
  });
});

describe("Postcode Tests", () => {
  it("Invalid Postcodes", async () => {
    const example1 = await yup.reach(schema, "postcode").isValid("X123");
    expect(example1).toBe(false);
    const example2 = await yup.reach(schema, "postcode").isValid("12345");
    expect(example2).toBe(false);
    const example3 = await yup.reach(schema, "postcode").isValid("123");
    expect(example3).toBe(false);
  });

  it("Valid Postcodes", async () => {
    const example1 = await yup.reach(schema, "postcode").isValid("2000");
    expect(example1).toBe(true);
    const example2 = await yup.reach(schema, "postcode").isValid("1234");
    expect(example2).toBe(true);
    const example3 = await yup.reach(schema, "postcode").isValid("2304");
    expect(example3).toBe(true);
  });
});

describe("State Tests", () => {
  it("Invalid States", async () => {
    const example1 = await yup.reach(schema, "state").isValid("X12");
    expect(example1).toBe(false);
    const example2 = await yup.reach(schema, "state").isValid("ABC");
    expect(example2).toBe(false);
    const example3 = await yup.reach(schema, "state").isValid("Y");
    expect(example3).toBe(false);
  });

  it("Valid States", async () => {
    const example1 = await yup.reach(schema, "state").isValid("ACT");
    expect(example1).toBe(true);
    const example2 = await yup.reach(schema, "state").isValid("NSW");
    expect(example2).toBe(true);
    const example3 = await yup.reach(schema, "state").isValid("NT");
    expect(example3).toBe(true);
  });
});

describe("ABN Tests", () => {
  it("Invalid ABN", async () => {
    const example1 = await yup.reach(schema, "abn").isValid("123");
    expect(example1).toBe(false);
    const example2 = await yup.reach(schema, "abn").isValid("A1234567890");
    expect(example2).toBe(false);
    const example3 = await yup.reach(schema, "abn").isValid("123456789012");
    expect(example3).toBe(false);
  });

  it("Valid ABN", async () => {
    const example1 = await yup.reach(schema, "abn").isValid("12345678901");
    expect(example1).toBe(true);
    const example2 = await yup.reach(schema, "abn").isValid("09876543210");
    expect(example2).toBe(true);
    const example3 = await yup.reach(schema, "abn").isValid("11223344556");
    expect(example3).toBe(true);
  });
});

describe("Hourly Rate Tests", () => {
  it("Invalid Hourly Rate", async () => {
    const example1 = await yup.reach(schema, "hourlyRate").isValid("-123");
    expect(example1).toBe(false);
    const example2 = await yup.reach(schema, "hourlyRate").isValid("123.123");
    expect(example2).toBe(false);
    const example3 = await yup.reach(schema, "hourlyRate").isValid("123.12.12");
    expect(example3).toBe(false);
  });

  it("Valid Hourly Rate", async () => {
    const example1 = await yup.reach(schema, "hourlyRate").isValid("123");
    expect(example1).toBe(true);
    const example2 = await yup.reach(schema, "hourlyRate").isValid("123.12");
    expect(example2).toBe(true);
    const example3 = await yup.reach(schema, "hourlyRate").isValid("123.00");
    expect(example3).toBe(true);
  });
});

describe("Insurance Expiry Date Tests", () => {
  it("Invalid Date", async () => {
    const example1 = await yup
      .reach(schema, "insuranceExpiryDate")
      .isValid("jan");
    expect(example1).toBe(false);
    const example2 = await yup
      .reach(schema, "insuranceExpiryDate")
      .isValid("123.123");
    expect(example2).toBe(false);
    const example3 = await yup
      .reach(schema, "insuranceExpiryDate")
      .isValid("123.1212.12");
    expect(example3).toBe(false);
  });

  it("Valid Date", async () => {
    const example1 = await yup
      .reach(schema, "insuranceExpiryDate")
      .isValid("12-1-2020");
    expect(example1).toBe(true);
    const example2 = await yup
      .reach(schema, "insuranceExpiryDate")
      .isValid("23-OCT-2020");
    expect(example2).toBe(true);
    const example3 = await yup
      .reach(schema, "insuranceExpiryDate")
      .isValid("1-12-2020");
    expect(example3).toBe(true);
  });
});

describe("Form Tests", () => {
  it("Invalid Form", async () => {
    const result = await schema.isValid({
      firstName: "Bruce Hello",
      lastName: "Banner",
      email: "bruce.banner@marvel.com",
      phone: "0400000000",
      postcode: "2093",
      state: "NSW",
      companyName: "Marvel Ltd",
      abn: "12123123123",
      hourlyRate: "395",
      insuranceExpiryDate: "31-may-1970",
    });
    expect(result).toBe(false);
  });

  it("Valid Form", async () => {
    const result = await schema.isValid({
      firstName: "Bruce",
      lastName: "Banner",
      email: "bruce.banner@marvel.com",
      phone: "0400000000",
      postcode: "2093",
      state: "NSW",
      companyName: "Marvel Ltd",
      abn: "12123123123",
      hourlyRate: "395",
      insuranceExpiryDate: "31-may-1970",
    });
    expect(result).toBe(true);
  });
});
