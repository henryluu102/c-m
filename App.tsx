
import React, { useState, useEffect } from 'react';
import { 
  Home, 
  Search, 
  Calendar, 
  MessageCircle, 
  UtensilsCrossed, 
  ChevronRight, 
  Flame, 
  Clock, 
  Users,
  X,
  Plus,
  Loader2,
  ChefHat
} from 'lucide-react';
import { AppSection, Recipe } from './types';
import { SAMPLE_RECIPES } from './constants';
import { geminiService } from './services/geminiService';

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<AppSection>(AppSection.HOME);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [chefResponse, setChefResponse] = useState<string>('');
  const [userQuery, setUserQuery] = useState('');
  const [fridgeIngredients, setFridgeIngredients] = useState('');

  const handleSuggestMeal = async () => {
    if (!fridgeIngredients.trim()) return;
    setIsAiLoading(true);
    try {
      const recipe = await geminiService.suggestMeal(fridgeIngredients);
      setSelectedRecipe(recipe);
      setFridgeIngredients('');
    } catch (error) {
      console.error("Error fetching suggestion:", error);
      alert("Mẹ Bếp đang bận một chút, bạn thử lại sau nhé!");
    } finally {
      setIsAiLoading(false);
    }
  };

  const handleAskChef = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userQuery.trim()) return;
    setIsAiLoading(true);
    try {
      const answer = await geminiService.askChef(userQuery);
      setChefResponse(answer);
      setUserQuery('');
    } catch (error) {
      console.error("Error asking chef:", error);
    } finally {
      setIsAiLoading(false);
    }
  };

  const renderHome = () => (
    <div className="space-y-12 pb-20">
      <section className="relative h-[60vh] flex items-center justify-center text-center px-4 overflow-hidden rounded-3xl mt-4 mx-4">
        <img 
          src="https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&q=80&w=1974" 
          className="absolute inset-0 w-full h-full object-cover"
          alt="Vietnamese meal"
        />
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10 max-w-2xl">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 drop-shadow-lg">Cơm Nhà</h1>
          <p className="text-xl text-white/90 mb-8 italic">"Vị ngon của sự sum vầy, hơi ấm của tình gia đình"</p>
          <button 
            onClick={() => setActiveSection(AppSection.EXPLORE)}
            className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-full font-semibold transition-all transform hover:scale-105 shadow-xl"
          >
            Khám Phá Món Ngon
          </button>
        </div>
      </section>

      <section className="px-6">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-3xl font-bold text-slate-800">Gợi Ý Hôm Nay</h2>
            <p className="text-slate-500">Những món ăn thanh đạm cho bữa cơm chiều</p>
          </div>
          <button 
             onClick={() => setActiveSection(AppSection.EXPLORE)}
             className="text-orange-600 font-semibold flex items-center gap-1 hover:gap-2 transition-all"
          >
            Xem tất cả <ChevronRight size={18} />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {SAMPLE_RECIPES.map(recipe => (
            <RecipeCard key={recipe.id} recipe={recipe} onClick={() => setSelectedRecipe(recipe)} />
          ))}
        </div>
      </section>

      <section className="px-6 py-12 bg-orange-50 rounded-[3rem] mx-4 border border-orange-100">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-10">
          <div className="md:w-1/2">
             <div className="bg-white p-6 rounded-2xl shadow-sm border border-orange-100">
                <ChefHat className="text-orange-500 mb-4" size={40} />
                <h3 className="text-2xl font-bold text-slate-800 mb-2">Hôm nay ăn gì?</h3>
                <p className="text-slate-600 mb-6">Bạn đang có nguyên liệu gì trong tủ lạnh? Hãy nhập vào đây để Mẹ Bếp gợi ý món ăn cho bạn nhé!</p>
                <div className="space-y-4">
                  <textarea 
                    value={fridgeIngredients}
                    onChange={(e) => setFridgeIngredients(e.target.value)}
                    placeholder="Ví dụ: thịt bò, bông cải, trứng..."
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
                    rows={3}
                  />
                  <button 
                    onClick={handleSuggestMeal}
                    disabled={isAiLoading || !fridgeIngredients.trim()}
                    className="w-full bg-slate-800 hover:bg-slate-900 text-white py-3 rounded-xl font-medium flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {isAiLoading ? <Loader2 className="animate-spin" size={20} /> : <Flame size={20} />}
                    Lấy gợi ý từ AI
                  </button>
                </div>
             </div>
          </div>
          <div className="md:w-1/2 space-y-6">
            <h2 className="text-4xl font-bold text-slate-800 leading-tight">Nấu Ăn Thông Minh Cùng <span className="text-orange-600">Mẹ Bếp AI</span></h2>
            <p className="text-lg text-slate-600">Đừng lo lắng về việc phải ăn gì mỗi ngày. Với trí tuệ nhân tạo, chúng tôi giúp bạn biến những nguyên liệu đơn giản thành bữa cơm thịnh soạn.</p>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-slate-700">
                <div className="w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center text-orange-600">✓</div>
                Tiết kiệm thời gian suy nghĩ món ăn
              </li>
              <li className="flex items-center gap-3 text-slate-700">
                <div className="w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center text-orange-600">✓</div>
                Tận dụng tối đa nguyên liệu có sẵn
              </li>
              <li className="flex items-center gap-3 text-slate-700">
                <div className="w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center text-orange-600">✓</div>
                Cân bằng dinh dưỡng cho cả gia đình
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );

  const renderExplore = () => (
    <div className="px-6 py-12 space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h2 className="text-4xl font-bold text-slate-800">Khám Phá Thực Đơn</h2>
        <div className="relative">
          <input 
            type="text" 
            placeholder="Tìm kiếm món kho, canh, xào..."
            className="pl-12 pr-6 py-3 rounded-full border border-slate-200 focus:ring-2 focus:ring-orange-500 w-full md:w-80 outline-none"
          />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
        </div>
      </div>
      
      <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
        {['Tất cả', 'Món Kho', 'Món Canh', 'Món Xào', 'Món Chiên', 'Nước Chấm'].map(cat => (
          <button 
            key={cat}
            className="px-6 py-2 rounded-full border border-slate-200 hover:border-orange-500 hover:bg-orange-50 whitespace-nowrap transition-colors"
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {[...SAMPLE_RECIPES, ...SAMPLE_RECIPES].map((recipe, idx) => (
          <RecipeCard key={`${recipe.id}-${idx}`} recipe={recipe} onClick={() => setSelectedRecipe(recipe)} />
        ))}
      </div>
    </div>
  );

  const renderAssistant = () => (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <div className="bg-white rounded-[2rem] shadow-xl border border-slate-100 overflow-hidden min-h-[600px] flex flex-col">
        <div className="bg-slate-800 p-8 text-white flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-orange-500 flex items-center justify-center">
            <ChefHat size={32} />
          </div>
          <div>
            <h2 className="text-2xl font-bold">Mẹ Bếp AI</h2>
            <p className="text-slate-300">Luôn sẵn sàng giúp bạn vào bếp</p>
          </div>
        </div>

        <div className="flex-1 p-8 overflow-y-auto space-y-6">
          <div className="flex gap-4">
            <div className="w-10 h-10 rounded-full bg-orange-100 flex-shrink-0 flex items-center justify-center text-orange-600">
              <ChefHat size={20} />
            </div>
            <div className="bg-slate-100 p-4 rounded-2xl rounded-tl-none max-w-[80%]">
              <p className="text-slate-800">Chào bạn! Mình là Mẹ Bếp. Bạn cần mình tư vấn gì về món ăn gia đình hôm nay không? Ví dụ: cách khử mùi tanh của cá, mẹo kho thịt mềm, hay thực đơn cho người ăn kiêng?</p>
            </div>
          </div>

          {chefResponse && (
            <div className="flex gap-4 flex-row-reverse">
              <div className="w-10 h-10 rounded-full bg-slate-800 flex-shrink-0 flex items-center justify-center text-white">
                <Users size={20} />
              </div>
              <div className="bg-orange-500 text-white p-4 rounded-2xl rounded-tr-none max-w-[80%]">
                <p>Tôi muốn hỏi về cách làm nước chấm ngon.</p>
              </div>
            </div>
          )}

          {chefResponse && (
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-orange-100 flex-shrink-0 flex items-center justify-center text-orange-600">
                <ChefHat size={20} />
              </div>
              <div className="bg-slate-100 p-4 rounded-2xl rounded-tl-none max-w-[80%]">
                <p className="text-slate-800 whitespace-pre-wrap">{chefResponse}</p>
              </div>
            </div>
          )}

          {isAiLoading && (
            <div className="flex gap-4 animate-pulse">
              <div className="w-10 h-10 rounded-full bg-slate-200"></div>
              <div className="bg-slate-100 h-12 w-48 rounded-2xl"></div>
            </div>
          )}
        </div>

        <form onSubmit={handleAskChef} className="p-6 border-t border-slate-100 bg-slate-50 flex gap-4">
          <input 
            type="text" 
            value={userQuery}
            onChange={(e) => setUserQuery(e.target.value)}
            placeholder="Đặt câu hỏi cho Mẹ Bếp..."
            className="flex-1 px-6 py-3 rounded-full border border-slate-200 focus:ring-2 focus:ring-orange-500 outline-none"
          />
          <button 
            type="submit"
            disabled={isAiLoading || !userQuery.trim()}
            className="bg-orange-500 hover:bg-orange-600 text-white p-3 rounded-full transition-all disabled:opacity-50"
          >
            <MessageCircle size={24} />
          </button>
        </form>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen pb-24">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-100 px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => setActiveSection(AppSection.HOME)}>
          <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center text-white font-bold text-xl">CN</div>
          <span className="text-2xl font-bold text-slate-800 hidden md:block">Cơm Nhà</span>
        </div>
        <nav className="hidden md:flex gap-8">
          {[
            { id: AppSection.HOME, label: 'Trang Chủ', icon: Home },
            { id: AppSection.EXPLORE, label: 'Khám Phá', icon: Search },
            { id: AppSection.PLANNER, label: 'Lên Lịch', icon: Calendar },
            { id: AppSection.ASSISTANT, label: 'Hỏi Mẹ Bếp', icon: MessageCircle },
          ].map(item => (
            <button 
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`flex items-center gap-2 font-medium transition-colors ${activeSection === item.id ? 'text-orange-500' : 'text-slate-600 hover:text-orange-500'}`}
            >
              <item.icon size={18} />
              {item.label}
            </button>
          ))}
        </nav>
        <button className="bg-slate-100 text-slate-800 p-2 rounded-full md:px-4 md:rounded-lg flex items-center gap-2 font-medium hover:bg-slate-200 transition-colors">
          <Plus size={20} />
          <span className="hidden md:inline">Đăng món mới</span>
        </button>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto">
        {activeSection === AppSection.HOME && renderHome()}
        {activeSection === AppSection.EXPLORE && renderExplore()}
        {activeSection === AppSection.ASSISTANT && renderAssistant()}
        {activeSection === AppSection.PLANNER && (
          <div className="px-6 py-20 text-center">
             <Calendar size={60} className="mx-auto text-slate-300 mb-4" />
             <h2 className="text-3xl font-bold text-slate-800">Tính năng Lên Lịch</h2>
             <p className="text-slate-500 max-w-md mx-auto mt-2">Tính năng lập kế hoạch bữa ăn tự động đang được phát triển. Hãy quay lại sau nhé!</p>
          </div>
        )}
      </main>

      {/* Bottom Nav Mobile */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-xl border border-slate-200 px-6 py-3 rounded-full shadow-2xl flex items-center gap-8 md:hidden z-50">
        {[
          { id: AppSection.HOME, icon: Home },
          { id: AppSection.EXPLORE, icon: Search },
          { id: AppSection.PLANNER, icon: Calendar },
          { id: AppSection.ASSISTANT, icon: MessageCircle },
        ].map(item => (
          <button 
            key={item.id}
            onClick={() => setActiveSection(item.id)}
            className={`p-2 rounded-full transition-all ${activeSection === item.id ? 'bg-orange-500 text-white scale-110 shadow-lg' : 'text-slate-400'}`}
          >
            <item.icon size={24} />
          </button>
        ))}
      </div>

      {/* Recipe Detail Modal */}
      {selectedRecipe && (
        <RecipeDetailModal 
          recipe={selectedRecipe} 
          onClose={() => setSelectedRecipe(null)} 
        />
      )}
    </div>
  );
};

interface RecipeCardProps {
  recipe: Recipe;
  onClick: () => void;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, onClick }) => {
  return (
    <div 
      onClick={onClick}
      className="group bg-white rounded-3xl overflow-hidden recipe-card-shadow cursor-pointer hover:-translate-y-2 transition-all duration-300"
    >
      <div className="relative h-56 overflow-hidden">
        <img 
          src={recipe.imageUrl} 
          alt={recipe.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-4 left-4">
          <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-orange-600 shadow-sm uppercase tracking-wider">
            {recipe.category}
          </span>
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-orange-500 transition-colors">{recipe.title}</h3>
        <p className="text-slate-500 text-sm line-clamp-2 mb-4 leading-relaxed">{recipe.description}</p>
        <div className="flex items-center justify-between text-xs text-slate-400 border-t border-slate-50 pt-4">
          <div className="flex items-center gap-1.5 font-medium">
            <Clock size={14} className="text-slate-300" />
            <span>{recipe.cookTime}</span>
          </div>
          <div className="flex items-center gap-1.5 font-medium">
            <Flame size={14} className="text-slate-300" />
            <span>{recipe.difficulty}</span>
          </div>
          <div className="flex items-center gap-1.5 font-medium">
            <Users size={14} className="text-slate-300" />
            <span>{recipe.servings} người</span>
          </div>
        </div>
      </div>
    </div>
  );
};

interface RecipeDetailModalProps {
  recipe: Recipe;
  onClose: () => void;
}

const RecipeDetailModal: React.FC<RecipeDetailModalProps> = ({ recipe, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative bg-white w-full max-w-5xl max-h-[90vh] rounded-[2rem] overflow-hidden shadow-2xl flex flex-col md:flex-row">
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 z-10 bg-white/20 hover:bg-white/40 text-white p-2 rounded-full backdrop-blur-md transition-colors"
        >
          <X size={24} />
        </button>

        <div className="md:w-5/12 relative h-64 md:h-auto">
          <img src={recipe.imageUrl} className="w-full h-full object-cover" alt={recipe.title} />
          <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/80 to-transparent text-white">
            <span className="bg-orange-500 px-3 py-1 rounded-full text-xs font-bold mb-3 inline-block">{recipe.category}</span>
            <h2 className="text-3xl font-bold">{recipe.title}</h2>
          </div>
        </div>

        <div className="md:w-7/12 p-8 md:p-12 overflow-y-auto">
          <div className="space-y-8">
            <section>
              <h3 className="text-xl font-bold text-slate-800 mb-3 border-b border-slate-100 pb-2">Giới thiệu</h3>
              <p className="text-slate-600 leading-relaxed italic">"{recipe.description}"</p>
              
              <div className="grid grid-cols-4 gap-4 mt-6">
                <div className="bg-slate-50 p-3 rounded-2xl text-center">
                  <span className="block text-xs text-slate-400 font-bold uppercase mb-1">Chuẩn bị</span>
                  <span className="font-bold text-slate-800">{recipe.prepTime}</span>
                </div>
                <div className="bg-slate-50 p-3 rounded-2xl text-center">
                  <span className="block text-xs text-slate-400 font-bold uppercase mb-1">Nấu</span>
                  <span className="font-bold text-slate-800">{recipe.cookTime}</span>
                </div>
                <div className="bg-slate-50 p-3 rounded-2xl text-center">
                  <span className="block text-xs text-slate-400 font-bold uppercase mb-1">Khẩu phần</span>
                  <span className="font-bold text-slate-800">{recipe.servings} người</span>
                </div>
                <div className="bg-slate-50 p-3 rounded-2xl text-center">
                  <span className="block text-xs text-slate-400 font-bold uppercase mb-1">Độ khó</span>
                  <span className="font-bold text-slate-800">{recipe.difficulty}</span>
                </div>
              </div>
            </section>

            <section>
              <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                <UtensilsCrossed size={20} className="text-orange-500" /> Nguyên liệu
              </h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {recipe.ingredients.map((ing, idx) => (
                  <li key={idx} className="flex justify-between items-center p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <span className="text-slate-700 font-medium">{ing.name}</span>
                    <span className="text-orange-600 font-bold">{ing.amount}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h3 className="text-xl font-bold text-slate-800 mb-4">Các bước thực hiện</h3>
              <div className="space-y-6">
                {recipe.instructions.map((step, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-slate-800 text-white flex items-center justify-center font-bold flex-shrink-0">
                      {idx + 1}
                    </div>
                    <p className="text-slate-700 pt-1 leading-relaxed">{step}</p>
                  </div>
                ))}
              </div>
            </section>

            {recipe.nutrition && (
               <section className="bg-orange-50 p-6 rounded-3xl border border-orange-100">
                 <h3 className="text-lg font-bold text-slate-800 mb-4">Giá trị dinh dưỡng (ước tính)</h3>
                 <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                   <div className="text-center">
                     <span className="block text-xs text-slate-400 uppercase">Calories</span>
                     <span className="text-lg font-bold text-orange-600">{recipe.nutrition.calories} kcal</span>
                   </div>
                   <div className="text-center">
                     <span className="block text-xs text-slate-400 uppercase">Đạm</span>
                     <span className="text-lg font-bold text-slate-800">{recipe.nutrition.protein}</span>
                   </div>
                   <div className="text-center">
                     <span className="block text-xs text-slate-400 uppercase">Carbs</span>
                     <span className="text-lg font-bold text-slate-800">{recipe.nutrition.carbs}</span>
                   </div>
                   <div className="text-center">
                     <span className="block text-xs text-slate-400 uppercase">Chất béo</span>
                     <span className="text-lg font-bold text-slate-800">{recipe.nutrition.fat}</span>
                   </div>
                 </div>
               </section>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
