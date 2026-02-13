import { useState, useEffect } from "react";
import { FinancialRecordInput } from "@/types/financial";

const SEGMENTS = ["Government", "Midmarket", "Enterprise", "Small Business", "Channel Partners"];
const COUNTRIES = ["Canada", "Germany", "France", "Mexico", "United States of America"];
const PRODUCTS = ["Carretera", "Montana", "Paseo", "Velo", "VTT", "Amarilla"];
const DISCOUNT_BANDS = ["None", "Low", "Medium", "High"];

interface RecordFormModalProps {
  initial?: FinancialRecordInput | null;
  onSave: (data: FinancialRecordInput) => Promise<void>;
  onClose: () => void;
}

const emptyForm: FinancialRecordInput = {
  segment: "Government",
  country: "Canada",
  product: "Carretera",
  discountBand: "None",
  unitsSold: 0,
  manufacturingPrice: 0,
  salePrice: 0,
  grossSales: 0,
  discounts: 0,
  sales: 0,
  cogs: 0,
  profit: 0,
  date: new Date().toISOString().split("T")[0],
};

export default function RecordFormModal({
  initial,
  onSave,
  onClose,
}: RecordFormModalProps) {
  const [form, setForm] = useState<FinancialRecordInput>(initial || emptyForm);
  const [saving, setSaving] = useState(false);

  const isEditing = !!initial;

  useEffect(() => {
    const grossSales = form.unitsSold * form.salePrice;
    const sales = grossSales - form.discounts;
    const profit = sales - form.cogs;
    setForm((prev) => ({ ...prev, grossSales, sales, profit }));
  }, [form.unitsSold, form.salePrice, form.discounts, form.cogs]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "number" ? parseFloat(value) || 0 : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await onSave(form);
    } finally {
      setSaving(false);
    }
  };

  const inputClass =
    "w-full p-2 border rounded bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-400 text-sm";
  const labelClass = "block text-xs font-medium mb-1 text-gray-600 dark:text-gray-400";

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <h3 className="text-xl font-bold text-green-400 mb-4">
            {isEditing ? "Edit Record" : "New Record"}
          </h3>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className={labelClass}>Segment</label>
                <select
                  name="segment"
                  value={form.segment}
                  onChange={handleChange}
                  className={inputClass}
                >
                  {SEGMENTS.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className={labelClass}>Country</label>
                <select
                  name="country"
                  value={form.country}
                  onChange={handleChange}
                  className={inputClass}
                >
                  {COUNTRIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className={labelClass}>Product</label>
                <select
                  name="product"
                  value={form.product}
                  onChange={handleChange}
                  className={inputClass}
                >
                  {PRODUCTS.map((p) => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className={labelClass}>Discount Band</label>
                <select
                  name="discountBand"
                  value={form.discountBand}
                  onChange={handleChange}
                  className={inputClass}
                >
                  {DISCOUNT_BANDS.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className={labelClass}>Date</label>
                <input
                  type="date"
                  name="date"
                  value={form.date}
                  onChange={handleChange}
                  className={inputClass}
                  required
                />
              </div>

              <div>
                <label className={labelClass}>Units Sold</label>
                <input
                  type="number"
                  name="unitsSold"
                  value={form.unitsSold}
                  onChange={handleChange}
                  className={inputClass}
                  step="0.01"
                  min="0"
                />
              </div>

              <div>
                <label className={labelClass}>Manufacturing Price</label>
                <input
                  type="number"
                  name="manufacturingPrice"
                  value={form.manufacturingPrice}
                  onChange={handleChange}
                  className={inputClass}
                  step="0.01"
                  min="0"
                />
              </div>

              <div>
                <label className={labelClass}>Sale Price</label>
                <input
                  type="number"
                  name="salePrice"
                  value={form.salePrice}
                  onChange={handleChange}
                  className={inputClass}
                  step="0.01"
                  min="0"
                />
              </div>

              <div>
                <label className={labelClass}>Gross Sales (auto)</label>
                <input
                  type="number"
                  name="grossSales"
                  value={form.grossSales}
                  onChange={handleChange}
                  className={`${inputClass} bg-gray-100 dark:bg-gray-600`}
                  step="0.01"
                  readOnly
                />
              </div>

              <div>
                <label className={labelClass}>Discounts</label>
                <input
                  type="number"
                  name="discounts"
                  value={form.discounts}
                  onChange={handleChange}
                  className={inputClass}
                  step="0.01"
                  min="0"
                />
              </div>

              <div>
                <label className={labelClass}>Sales (auto)</label>
                <input
                  type="number"
                  name="sales"
                  value={form.sales}
                  onChange={handleChange}
                  className={`${inputClass} bg-gray-100 dark:bg-gray-600`}
                  step="0.01"
                  readOnly
                />
              </div>

              <div>
                <label className={labelClass}>COGS</label>
                <input
                  type="number"
                  name="cogs"
                  value={form.cogs}
                  onChange={handleChange}
                  className={inputClass}
                  step="0.01"
                  min="0"
                />
              </div>

              <div>
                <label className={labelClass}>Profit (auto)</label>
                <input
                  type="number"
                  name="profit"
                  value={form.profit}
                  onChange={handleChange}
                  className={`${inputClass} bg-gray-100 dark:bg-gray-600`}
                  step="0.01"
                  readOnly
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t dark:border-gray-700">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm rounded border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving}
                className="px-4 py-2 text-sm rounded bg-green-500 hover:bg-green-600 text-white font-semibold transition disabled:opacity-50"
              >
                {saving ? "Saving..." : isEditing ? "Update" : "Create"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
