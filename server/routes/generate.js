import express from "express";

const router = express.Router();

router.post("/", (req, res) => {
  const { code } = req.body;

  const tests = `
describe("sum()", () => {
  it("adds two numbers", () => {
    expect(sum(2, 3)).toBe(5);
  });
});
`;

  res.json({ tests });
});

export default router;
