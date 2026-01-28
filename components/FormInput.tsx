
import React from 'react';
import { UserInput } from '../types';

interface FormInputProps {
  onSubmit: (data: UserInput) => void;
  isLoading: boolean;
}

const FormInput: React.FC<FormInputProps> = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = React.useState<UserInput>({
    fullName: '',
    birthDate: '',
    birthHour: '00:00',
    gender: 'Nam',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.birthDate) {
      alert('Vui lòng nhập đầy đủ họ tên và ngày sinh');
      return;
    }
    onSubmit(formData);
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-slate-900/50 backdrop-blur-md rounded-2xl border border-yellow-900/20 shadow-2xl">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-yellow-500 text-xs uppercase tracking-widest font-bold mb-2">Họ và Tên</label>
          <input
            type="text"
            placeholder="Ví dụ: Nguyễn Văn A"
            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-slate-100 focus:outline-none focus:border-yellow-600 transition-colors"
            value={formData.fullName}
            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            disabled={isLoading}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-yellow-500 text-xs uppercase tracking-widest font-bold mb-2">Ngày Sinh (Dương Lịch)</label>
            <input
              type="date"
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-slate-100 focus:outline-none focus:border-yellow-600 transition-colors"
              value={formData.birthDate}
              onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
              disabled={isLoading}
            />
          </div>
          <div>
            <label className="block text-yellow-500 text-xs uppercase tracking-widest font-bold mb-2">Giờ Sinh</label>
            <select
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-slate-100 focus:outline-none focus:border-yellow-600 transition-colors"
              value={formData.birthHour}
              onChange={(e) => setFormData({ ...formData, birthHour: e.target.value })}
              disabled={isLoading}
            >
              {Array.from({ length: 24 }).map((_, i) => {
                const hour = i.toString().padStart(2, '0');
                return (
                  <option key={hour} value={`${hour}:00`}>
                    {hour}:00
                  </option>
                );
              })}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-yellow-500 text-xs uppercase tracking-widest font-bold mb-2">Giới Tính</label>
          <div className="flex space-x-4">
            {['Nam', 'Nữ'].map((g) => (
              <button
                key={g}
                type="button"
                onClick={() => setFormData({ ...formData, gender: g as 'Nam' | 'Nữ' })}
                disabled={isLoading}
                className={`flex-1 py-3 rounded-lg border transition-all ${
                  formData.gender === g
                    ? 'bg-yellow-600/20 border-yellow-600 text-yellow-500 shadow-[0_0_15px_rgba(202,138,4,0.3)]'
                    : 'bg-slate-800 border-slate-700 text-slate-400'
                }`}
              >
                {g}
              </button>
            ))}
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full py-4 rounded-lg font-heading text-lg font-bold tracking-widest transition-all ${
            isLoading
              ? 'bg-slate-700 text-slate-500 cursor-not-allowed'
              : 'bg-gradient-to-r from-yellow-700 via-yellow-600 to-yellow-800 text-white hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(202,138,4,0.4)] active:scale-95'
          }`}
        >
          {isLoading ? 'ĐANG KHAI LỘ THIÊN CƠ...' : 'XEM LÁ SỐ'}
        </button>
      </form>
    </div>
  );
};

export default FormInput;
