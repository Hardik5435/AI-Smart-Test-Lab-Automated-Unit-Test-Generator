import express from "express";
import { VM } from "vm2";

const router = express.Router();

router.post("/", (req, res) => {
  const { code, tests } = req.body;

  try {
    const vm = new VM({ timeout: 1000 });

    vm.run(`
      ${code}

      const expect = (val) => ({
        toBe: (exp) => {
          if (val !== exp) {
            throw new Error("Test failed");
          }
        }
      });

      ${tests}
    `);

    res.json({ success: true });
  } catch (err) {
    res.json({ success: false, error: err.message });
  }
});

export default router;
