# cubex-routes

sudo apt update</br></br>

sudo apt install -y mongodb</br></br>

git clone https://github.com/artshirin2009/cubex-routes.git</br></br>

npm install</br></br>

Routes:</br>

/**Empty route */
router.get('/', routes.start);

/**Registration */
router.post('/registration', routes.registration);

/**Login page */
router.post('/login', routes.login);

/**Get profile page */
router.get('/get-profile', verifyToken, routes.getProfile);

/**Update profile (+images) */
router.post('/update-profile',
    verifyToken,
    multerUpload.single('imageFile'),
    routes.updateProfile);

/**Update profiles (only for admin) */
router.post('/update-profiles',
    verifyToken,
    multerUpload.single('imageFile'),
    routes.updateProfilesForAdmin);

/**Get profile all users (only if isAdmin:true) */
router.get('/all-users', verifyToken, routes.getAllUsers);
/**Delete user */
router.post('/delete', verifyToken, routes.deleteUser);

Post routes</br>

/**All posts */
router.get('/', routes.getAllPosts);

/**Create post */
router.post('/create-post', verifyToken,multerUpload.single('imageFile'), routes.createPost);

/**Edit post admin*/
router.post('/edit-post', verifyToken,multerUpload.single('imageFile'), routes.editPost);
