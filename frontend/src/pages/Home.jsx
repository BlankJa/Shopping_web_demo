import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';
import useFetch from '../utils/useFetch';
import './Home.css'

const Home = () => {
  const { data, loading, error, refetch: fetchFeaturedProducts } = useFetch('/api/products', { page: 0, size: 8, sort: 'popularity' });
  const featuredProducts = data?.content || [];

  if (loading) {
    return <Loading message="加载首页内容中..." size="large" />;
  }

  return (
    <div>
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <h1 className="display-4 fw-bold mb-4">
                Welcome to <span className="text-primary">Our Shop</span>
              </h1>
              <p className="lead mb-4">
                发现优质商品，享受便捷购物体验。我们为您精选了各类商品，
                让您轻松找到心仪的产品。
              </p>
              <div className="d-flex gap-3">
                <Link to="/products" className="btn btn-light btn-lg">
                  <i className="fas fa-shopping-bag me-2"></i>
                  开始购物
                </Link>
                <Link to="/products?category=热门" className="btn btn-light btn-lg">
                  <i className="fas fa-fire me-2"></i>
                  热门商品
                </Link>
              </div>
            </div>
            <div className="col-lg-6 text-center">
              <i className="fas fa-shopping-cart" style={{ fontSize: '10rem', opacity: 0.3 }}></i>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-5 bg-light">
        <div className="container">
          <div className="row text-center">
            <div className="col-md-4 mb-4">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-body p-4">
                  <i className="fas fa-shipping-fast text-primary mb-3" style={{ fontSize: '3rem' }}></i>
                  <h5 className="card-title">快速配送</h5>
                  <p className="card-text text-muted">
                    全国范围内快速配送，让您尽快收到心仪的商品。
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-body p-4">
                  <i className="fas fa-shield-alt text-primary mb-3" style={{ fontSize: '3rem' }}></i>
                  <h5 className="card-title">安全保障</h5>
                  <p className="card-text text-muted">
                    采用先进的安全技术，保护您的个人信息和交易安全。
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-body p-4">
                  <i className="fas fa-headset text-primary mb-3" style={{ fontSize: '3rem' }}></i>
                  <h5 className="card-title">客户服务</h5>
                  <p className="card-text text-muted">
                    7x24小时客户服务，随时为您解答疑问和处理问题。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-5">
        <div className="container">
          <div className="row mb-4">
            <div className="col-12 text-center">
              <h2 className="display-5 fw-bold mb-3">热门商品</h2>
              <p className="lead text-muted">
                精选热门商品，为您推荐最受欢迎的产品
              </p>
            </div>
          </div>
          
          {error ? (
            <ErrorMessage 
              message={error} 
              onRetry={fetchFeaturedProducts}
            />
          ) : (
            <>
              {featuredProducts.length > 0 ? (
                <>
                  <div className="row">
                    {featuredProducts.map(product => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                  
                  <div className="row mt-4">
                    <div className="col-12 text-center">
                      <Link to="/products" className="btn btn-primary btn-lg">
                        <i className="fas fa-arrow-right me-2"></i>
                        查看更多商品
                      </Link>
                    </div>
                  </div>
                </>
              ) : (
                <div className="text-center py-5">
                  <i className="fas fa-box-open text-muted mb-3" style={{ fontSize: '3rem' }}></i>
                  <h4 className="text-muted">暂无商品</h4>
                  <p className="text-muted">商品正在准备中，请稍后再来查看</p>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-5 bg-primary text-white">
        <div className="container">
          <div className="row justify-content-center text-center">
            <div className="col-lg-6">
              <h3 className="mb-3">订阅我们的新闻</h3>
              <p className="mb-4">
                获取最新的商品信息和优惠活动通知
              </p>
              <div className="input-group input-group-lg">
                <input 
                  type="email" 
                  className="form-control" 
                  placeholder="请输入您的邮箱地址"
                />
                <button className="btn btn-light" type="button">
                  <i className="fas fa-paper-plane me-1"></i>
                  订阅
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;